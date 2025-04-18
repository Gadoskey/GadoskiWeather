
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cloud, Sun, CloudRain, ArrowRight, Cpu, Clock, Star, User, CloudSunRain, LocateFixed } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";


const Landing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();

  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } transition-all duration-1000 ease-out`}
        ></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 
              className={`text-4xl md:text-6xl font-bold bg-clip-text pb-3 text-transparent bg-gradient-to-r from-primary to-secondary mb-6 transform ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              } transition-all duration-700 ease-out`}
            >
              Weather Insights at Your Fingertips
            </h1>
            <p 
              className={`text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 transform ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              } transition-all duration-700 delay-100 ease-out`}
            >
              Get accurate weather data and detailed AI analytics for any location. Plan with confidence using our powerful weather platform.
            </p>
            <div 
              className={`flex flex-col sm:flex-row justify-center gap-4 transform ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              } transition-all duration-700 delay-200 ease-out`}
            >
              <Link to="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              { !user && <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Log In
                </Button>
              </Link> }
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Weather Features</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Access comprehensive weather data with our intuitive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-6">
                <Cloud className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Weather</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get up-to-the-minute weather updates with accurate forecasts and conditions
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in delay-100">
              <div className="bg-secondary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-6">
                <Sun className="text-secondary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Weather Trends</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Analyze weather patterns and trends with interactive charts and visualizations
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in delay-200">
              <div className="bg-blue-500/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-6">
                <CloudRain className="text-blue-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Historical Data</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access historical weather data to make informed decisions and plan ahead
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in delay-200">
              <div className="bg-purple-500/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-6">
                <Cpu className="text-purple-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive smart weather summaries and actionable insights tailored to your location.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in delay-300">
              <div className="bg-green-500/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-6">
                <Clock className="text-green-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Recent Searches</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Quickly access your most recent weather lookups without retyping coordinates.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in delay-400">
              <div className="bg-yellow-500/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-6">
                <Star className="text-yellow-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Favorites</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Bookmark key locations for faster weather checks anytime you visit.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Getting accurate weather data has never been easier. Here's how to get started:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-6">
                <User className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sign Up or Log In</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create an account or log in with Google or Apple to personalize your experience and save your data.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 delay-100">
              <div className="bg-secondary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-6">
                <LocateFixed className="text-secondary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Your Location</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Use your device’s GPS to detect your location or manually enter coordinates to get weather updates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 delay-200">
              <div className="bg-blue-500/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-6">
                <CloudSunRain className="text-blue-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">View Your Weather Data</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Instantly get daily and monthly weather details including temperature, precipitation, pressure, and more.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      { !user && <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join thousands of users who trust WeatherInsight for their weather data needs. Sign up today and experience the difference.
          </p>
          <Link to="/signup">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 bg-white text-primary hover:bg-gray-100">
              Create Free Account
            </button>
          </Link>
        </div>
      </section> }

    </div>
  );
};

export default Landing;
