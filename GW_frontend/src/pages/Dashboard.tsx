
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../context/AuthContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Cloud, CloudRain, Sun, Wind, Thermometer, Search, History } from "lucide-react";

// Define mock weather data interfaces
interface WeatherQuery {
  id: string;
  latitude: string;
  longitude: string;
  startDate: string;
  endDate: string;
  timestamp: Date;
}

interface WeatherDataPoint {
  date: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  conditions: string;
}

interface WeatherData {
  location: string;
  data: WeatherDataPoint[];
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [searchHistory, setSearchHistory] = useState<WeatherQuery[]>([]);
  const [activeTab, setActiveTab] = useState("search");

  // Initialize with some mock history data
  useEffect(() => {
    const mockHistory: WeatherQuery[] = [
      {
        id: "1",
        latitude: "40.7128",
        longitude: "-74.0060",
        startDate: "2023-01-01",
        endDate: "2023-01-07",
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },
      {
        id: "2",
        latitude: "34.0522",
        longitude: "-118.2437",
        startDate: "2023-02-01",
        endDate: "2023-02-07",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ];
    setSearchHistory(mockHistory);
  }, []);

  // Generate mock weather data based on input
  const generateMockWeatherData = (
    lat: string,
    lon: string,
    start: string,
    end: string
  ): WeatherData => {
    const startTimestamp = new Date(start).getTime();
    const endTimestamp = new Date(end).getTime();
    const dayCount = Math.ceil((endTimestamp - startTimestamp) / (1000 * 60 * 60 * 24)) + 1;
    
    const data: WeatherDataPoint[] = [];
    
    for (let i = 0; i < dayCount; i++) {
      const currentDate = new Date(startTimestamp + i * 24 * 60 * 60 * 1000);
      const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      // Generate some realistic-looking random data based on lat/lon
      const baseTemp = parseFloat(lat) > 0 ? 22 : 10; // Northern/Southern hemisphere
      const randomFactor = Math.sin(i / 3) * 5; // Add some cyclical variation
      
      data.push({
        date: formattedDate,
        temperature: Math.round((baseTemp + randomFactor + Math.random() * 8) * 10) / 10,
        humidity: Math.round(50 + Math.random() * 40),
        windSpeed: Math.round((5 + Math.random() * 15) * 10) / 10,
        conditions: i % 3 === 0 ? "Sunny" : i % 3 === 1 ? "Cloudy" : "Rainy",
      });
    }
    
    return {
      location: `Coordinates (${lat}, ${lon})`,
      data,
    };
  };

  const handleSearch = async () => {
    if (!latitude || !longitude || !startDate || !endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to search for weather data.",
        variant: "destructive",
      });
      return;
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    if (endDateObj < startDateObj) {
      toast({
        title: "Invalid Date Range",
        description: "End date cannot be before start date.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock weather data
      const mockData = generateMockWeatherData(latitude, longitude, startDate, endDate);
      setWeatherData(mockData);
      
      // Add to search history
      const newSearch: WeatherQuery = {
        id: Date.now().toString(),
        latitude,
        longitude,
        startDate,
        endDate,
        timestamp: new Date(),
      };
      
      setSearchHistory(prev => [newSearch, ...prev]);
      
      toast({
        title: "Weather Data Retrieved",
        description: `Successfully fetched weather data for coordinates (${latitude}, ${longitude})`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadHistoryItem = (item: WeatherQuery) => {
    setLatitude(item.latitude);
    setLongitude(item.longitude);
    setStartDate(item.startDate);
    setEndDate(item.endDate);
    setActiveTab("search");
    
    // Auto-trigger search
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search for weather insights by location and date range.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Search History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-8 animate-fade-in">
            {/* Search Form */}
            <Card>
              <CardHeader>
                <CardTitle>Search Weather Data</CardTitle>
                <CardDescription>
                  Enter location coordinates and date range to get weather insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      placeholder="e.g. 40.7128"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      placeholder="e.g. -74.0060"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleSearch} 
                  className="w-full mt-6 bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Fetching Weather Data...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Search className="mr-2 h-4 w-4" />
                      Search Weather Data
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Weather Results */}
            {weatherData && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-2xl font-bold">Weather Results for {weatherData.location}</h2>
                
                {/* Weather Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Temperature Trends</CardTitle>
                    <CardDescription>
                      Temperature variation over the selected date range
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={weatherData.data}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="temperature"
                            stroke="#3b82f6"
                            activeDot={{ r: 8 }}
                            name="Temperature (°C)"
                          />
                          <Line
                            type="monotone"
                            dataKey="humidity"
                            stroke="#a855f7"
                            name="Humidity (%)"
                          />
                          <Line
                            type="monotone"
                            dataKey="windSpeed"
                            stroke="#10b981"
                            name="Wind Speed (km/h)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Weather Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {weatherData.data.map((day, index) => (
                    <Card key={index} className="weather-card overflow-hidden">
                      <div className={`p-4 ${
                        day.conditions === "Sunny" 
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500" 
                          : day.conditions === "Cloudy"
                            ? "bg-gradient-to-r from-gray-400 to-gray-500"
                            : "bg-gradient-to-r from-blue-400 to-blue-500"
                      }`}>
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-medium">{day.date}</h3>
                          <div className="bg-white/20 p-2 rounded-full">
                            {getWeatherIcon(day.conditions)}
                          </div>
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <h4 className="text-xl font-semibold mb-4">{day.conditions}</h4>
                        <div className="grid grid-cols-2 gap-y-2">
                          <div className="flex items-center">
                            <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                            <span>{day.temperature}°C</span>
                          </div>
                          <div className="flex items-center">
                            <Cloud className="h-4 w-4 text-blue-500 mr-2" />
                            <span>{day.humidity}%</span>
                          </div>
                          <div className="flex items-center">
                            <Wind className="h-4 w-4 text-green-500 mr-2" />
                            <span>{day.windSpeed} km/h</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Search History</CardTitle>
                <CardDescription>
                  Your recent weather data searches
                </CardDescription>
              </CardHeader>
              <CardContent>
                {searchHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No search history yet. Try searching for weather data.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchHistory.map((item) => (
                      <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => loadHistoryItem(item)}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Coordinates: ({item.latitude}, {item.longitude})</h4>
                              <p className="text-sm text-gray-500">
                                Date Range: {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.timestamp.toLocaleString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
