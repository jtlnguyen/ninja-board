package com.redhat.sso.ninja;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

import com.redhat.sso.ninja.chart.Chart2Json;
import com.redhat.sso.ninja.chart.DataSet2;
import com.redhat.sso.ninja.utils.Json;

@Path("/points")
public class ManagementController {
  
  @POST
  @Path("/register")
  public Response register(
      @Context HttpServletRequest request 
      ,@Context HttpServletResponse response
      ,@Context ServletContext servletContext
      ){
    try{
      System.out.println("/register called");
      String raw=IOUtils.toString(request.getInputStream());
      mjson.Json x=mjson.Json.read(raw);
      String username=x.at("username").asString();
      
      Database2 db=Database2.get();
      
      if (db.getUsers().containsKey(username)){
        db.getUsers().remove(username); // remove so we can overwrite the user details
      }
      
//      String email=x.at("email").asString();
//      String github=x.at("githubId").asString();
//      String trello=x.at("trelloId").asString();
      
      Map<String, String> user=new HashMap<String, String>();
      for(Entry<String, Object> e:x.asMap().entrySet()){
        user.put(e.getKey(), (String)e.getValue());
      }
      
      System.out.println("Registered user: "+Json.newObjectMapper(true).writeValueAsString(user));
//      User user=new User(username, email, github, trello);
      if (!db.getUsers().containsKey(username)){
        db.getUsers().put(username, user);
      }else{
        return Response.status(500).entity("{\"status\":\"ERROR\",\"message\":\"Username in use already\"}").build();        
      }
      db.save();
    }catch(IOException e){
      e.printStackTrace();
    }
    
    return Response.status(200).entity("{\"status\":\"DONE\"}").build();
  }
  
  @GET
  @Path("/{user}/{pool}/{increment}")
  public Response incrementPool(
      @Context HttpServletRequest request 
      ,@Context HttpServletResponse response
      ,@Context ServletContext servletContext
      ,@PathParam("user") String user
      ,@PathParam("pool") String pool
      ,@PathParam("increment") String increment
      ){
    try{
      Database2.get().increment(pool, user, Integer.valueOf(increment)).save();;
    }catch(Exception e){
      return Response.status(500).entity("{\"status\":\"ERROR\",\"message\":\""+e.getMessage()+"\"}").build();  
    }
    return Response.status(200).entity("{\"status\":\"DONE\"}").build();
  }
  
  @GET
  @Path("/get")
  public Response getDatabase() throws JsonGenerationException, JsonMappingException, IOException{
    return Response.status(200).entity(Json.newObjectMapper(true).writeValueAsString(Database2.get())).build();
  }
  
  public static void main(String[] asd) throws JsonGenerationException, JsonMappingException, IOException{
    System.out.println(new ManagementController().getLeaderboard2(3).getEntity());
//    System.out.println(new ManagementController().getList().getEntity());
  }

  @GET
  @Path("/list")
  public Response getList() throws JsonGenerationException, JsonMappingException, IOException{
    Database2 db=Database2.get();
    List<Map<String, Object>> result=new ArrayList<Map<String,Object>>();
    
    Set<String> fields=new HashSet<String>();
    
    for(Entry<String, Map<String, Integer>> e:db.getScoreCards().entrySet()){
      Map<String, Object> row=new HashMap<String, Object>();
      Map<String,String> userInfo=db.getUsers().get(e.getKey());
      row.put("id", e.getKey());
      row.put("name", userInfo.containsKey("displayName")?userInfo.get("displayName"):e.getKey());
      int total=0;
      for(Entry<String, Integer> s:e.getValue().entrySet()){
        row.put(s.getKey().replaceAll("\\.", ""), s.getValue());
        total+=s.getValue();
        fields.add(s.getKey().replaceAll("\\.", ""));
      }
      row.put("total", total);
      result.add(row);
    }
    
    // fill in the missing points fields with zero's
    for(Map<String, Object> e:result){
      for (String field:fields){
        if (!e.containsKey(field)){
          e.put(field, 0);
        }
      }
    }
    
    return Response.status(200).entity(Json.newObjectMapper(true).writeValueAsString(result)).build();
  }
  
  @GET
  @Path("/leaderboard2/{max}")
  public Response getLeaderboard2(@PathParam("max") Integer max) throws JsonGenerationException, JsonMappingException, IOException{
    Database2 db=Database2.get();
    Map<String, Map<String, Integer>> leaderboard=db.getLeaderboard();
    Map<String, Integer> totals=new HashMap<String, Integer>();
    for(Entry<String, Map<String, Integer>> e:leaderboard.entrySet()){
      Integer t=0;
      for(Entry<String, Integer> e2:e.getValue().entrySet()){
        t+=e2.getValue();
      }
      e.getValue().put("total", t);
      totals.put(e.getKey(), t);
    }
    
    //reorder
    List<Entry<String, Integer>> list=new LinkedList<Map.Entry<String, Integer>>(totals.entrySet());
    Collections.sort(list, new Comparator<Map.Entry<String, Integer>>() {
      public int compare(Map.Entry<String, Integer> o1, Map.Entry<String, Integer> o2) {
          return (o2.getValue()).compareTo(o1.getValue());
      }
    });
    HashMap<String, Integer> sortedTotals=new LinkedHashMap<String, Integer>();
    for (Entry<String, Integer> e:list) {
      sortedTotals.put(e.getKey(), e.getValue());
    }
    
    Chart2Json c=new Chart2Json();
    c.setDatasets(new ArrayList<DataSet2>());
    int count=0;
    for(Entry<String, Integer> e:sortedTotals.entrySet()){
      Map<String, String> userInfo=db.getUsers().get(e.getKey());
      
      c.getLabels().add(null!=userInfo && userInfo.containsKey("displayName")?userInfo.get("displayName"):e.getKey());
      
      if (c.getDatasets().size()<=0) c.getDatasets().add(new DataSet2());
      c.getDatasets().get(0).getData().add(e.getValue());
      c.getDatasets().get(0).setBorderWidth(1);
      c.getDatasets().get(0).getBackgroundColor().add("rgba(163,0,0,0.8)");
      c.getDatasets().get(0).getBorderColor().add("rgba(130,0,0,0.8)");
      
      count=count+1;
      if (count>=max) break;
    }
    return Response.status(200).entity(Json.newObjectMapper(true).writeValueAsString(c)).build();
  }
  
  @GET
  @Path("/leaderboard")
  public Response getLeaderboard() throws JsonGenerationException, JsonMappingException, IOException{
    Map<String, Map<String, Integer>> pools=Database2.get().getLeaderboard();
    Map<String, Integer> totals=new HashMap<String, Integer>();
    for(Map<String, Integer> pool:pools.values()){
      for(Entry<String, Integer> e:pool.entrySet()){
        if (!totals.containsKey(e.getKey())) totals.put(e.getKey(), 0);
        totals.put(e.getKey(), totals.get(e.getKey())+e.getValue());
      }
    }
    
    //reorder
    List<Entry<String, Integer>> list=new LinkedList<Map.Entry<String, Integer>>(totals.entrySet());
    Collections.sort(list, new Comparator<Map.Entry<String, Integer>>() {
      public int compare(Map.Entry<String, Integer> o1, Map.Entry<String, Integer> o2) {
          return (o2.getValue()).compareTo(o1.getValue());
      }
    });
    HashMap<String, Integer> sorted=new LinkedHashMap<String, Integer>();
    for (Entry<String, Integer> e:list) {
      sorted.put(e.getKey(), e.getValue());
    }
    
    
    Chart2Json c=new Chart2Json();
    c.setDatasets(new ArrayList<DataSet2>());
    for(Entry<String, Integer> e:sorted.entrySet()){
      c.getLabels().add(e.getKey());
      
      if (c.getDatasets().size()<=0) c.getDatasets().add(new DataSet2());
      
      c.getDatasets().get(0).getData().add(e.getValue());
      c.getDatasets().get(0).setBorderWidth(1);
      c.getDatasets().get(0).getBackgroundColor().add("rgba(163,0,0,0.8)");
      c.getDatasets().get(0).getBorderColor().add("rgba(130,0,0,0.8)");
    }
    
    
/*
    {
      labels : ["January","February","March","April","May","June","July","Aug"],
      datasets : [{
              fillColor : "#48A497",
              strokeColor : "#48A4D1",
              data : [456,479,324,569,702,600,200]
          },{
              fillColor : "rgba(73,188,170,0.4)",
              strokeColor : "rgba(72,174,209,0.4)",
              data : [364,504,605,400,345,320]
    }]}
*/
    
    return Response.status(200).entity(Json.newObjectMapper(true).writeValueAsString(c)).build();
  }
  
}