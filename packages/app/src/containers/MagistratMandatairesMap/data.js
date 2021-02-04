const datas = [
  {
    city: "New York",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg",
    latitude: 40.6643,
    longitude: -73.9385,
    population: "8,175,133",
    state: "New York",
  },
  {
    city: "Los Angeles",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/240px-LA_Skyline_Mountains2.jpg",
    latitude: 34.0194,
    longitude: -118.4108,
    population: "3,792,621",
    state: "California",
  },
  {
    city: "Chicago",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2008-06-10_3000x1000_chicago_skyline.jpg/240px-2008-06-10_3000x1000_chicago_skyline.jpg",
    latitude: 41.8376,
    longitude: -87.6818,
    population: "2,695,598",
    state: "Illinois",
  },
  {
    city: "Houston",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg/240px-Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg",
    latitude: 29.7805,
    longitude: -95.3863,
    population: "2,100,263",
    state: "Texas",
  },
  {
    city: "Phoenix",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Downtown_Phoenix_Aerial_Looking_Northeast.jpg/207px-Downtown_Phoenix_Aerial_Looking_Northeast.jpg",
    latitude: 33.5722,
    longitude: -112.088,
    population: "1,445,632",
    state: "Arizona",
  },
  {
    city: "Philadelphia",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Philly_skyline.jpg/240px-Philly_skyline.jpg",
    latitude: 40.0094,
    longitude: -75.1333,
    population: "1,526,006",
    state: "Pennsylvania",
  },
  {
    city: "San Antonio",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Downtown_San_Antonio_View.JPG/240px-Downtown_San_Antonio_View.JPG",
    latitude: 29.4724,
    longitude: -98.5251,
    population: "1,327,407",
    state: "Texas",
  },
  {
    city: "San Diego",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg/240px-US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg",
    latitude: 32.8153,
    longitude: -117.135,
    population: "1,307,402",
    state: "California",
  },
  {
    city: "Dallas",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Dallas_skyline_daytime.jpg/240px-Dallas_skyline_daytime.jpg",
    latitude: 32.7757,
    longitude: -96.7967,
    population: "1,197,816",
    state: "Texas",
  },
  {
    city: "San Jose",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Downtown_San_Jose_skyline.PNG/240px-Downtown_San_Jose_skyline.PNG",
    latitude: 37.2969,
    longitude: -121.8193,
    population: "945,942",
    state: "California",
  },
  {
    city: "Austin",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Austin2012-12-01.JPG/240px-Austin2012-12-01.JPG",
    latitude: 30.3072,
    longitude: -97.756,
    population: "790,390",
    state: "Texas",
  },
  {
    city: "Jacksonville",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg/240px-Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg",
    latitude: 30.337,
    longitude: -81.6613,
    population: "821,784",
    state: "Florida",
  },
  {
    city: "San Francisco",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/San_Francisco_skyline_from_Coit_Tower.jpg/240px-San_Francisco_skyline_from_Coit_Tower.jpg",
    latitude: 37.7751,
    longitude: -122.4193,
    population: "805,235",
    state: "California",
  },
  {
    city: "Columbus",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Columbus-ohio-skyline-panorama.jpg/240px-Columbus-ohio-skyline-panorama.jpg",
    latitude: 39.9848,
    longitude: -82.985,
    population: "787,033",
    state: "Ohio",
  },
  {
    city: "Indianapolis",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Downtown_indy_from_parking_garage_zoom.JPG/213px-Downtown_indy_from_parking_garage_zoom.JPG",
    latitude: 39.7767,
    longitude: -86.1459,
    population: "820,445",
    state: "Indiana",
  },
  {
    city: "Fort Worth",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/d/db/FortWorthTexasSkylineW.jpg/240px-FortWorthTexasSkylineW.jpg",
    latitude: 32.7795,
    longitude: -97.3463,
    population: "741,206",
    state: "Texas",
  },
  {
    city: "Charlotte",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Charlotte_skyline45647.jpg/222px-Charlotte_skyline45647.jpg",
    latitude: 35.2087,
    longitude: -80.8307,
    population: "731,424",
    state: "North Carolina",
  },
  {
    city: "Seattle",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SeattleI5Skyline.jpg/240px-SeattleI5Skyline.jpg",
    latitude: 47.6205,
    longitude: -122.3509,
    population: "608,660",
    state: "Washington",
  },
  {
    city: "Denver",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/DenverCP.JPG/240px-DenverCP.JPG",
    latitude: 39.7618,
    longitude: -104.8806,
    population: "600,158",
    state: "Colorado",
  },
  {
    city: "El Paso",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Downtown_El_Paso_at_sunset.jpeg/240px-Downtown_El_Paso_at_sunset.jpeg",
    latitude: 31.8484,
    longitude: -106.427,
    population: "649,121",
    state: "Texas",
  },
];

export { datas };
