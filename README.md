# Marmot Creek Journaling #
Marmot Creek Journaling provides a full daily blog for long-distance hikers of the John Muir Trail with minimal startup and zero ongoing effort. Make your family and friends feel included on your journey without needing internet connectivity on the trail. This project was implemented by the Acyclic Directed Giraffes ([Kate Jenkins](https://github.com/katemonkeys), [Lindsey Smith](https://github.com/leaena), [Archana Balagondar](https://github.com/pbarchana)) for the LAUNCH Hackathon in San Francisco, CA, Feb 21-23, 2014.

It is live on [Heroku](http://marmotcreek.herokuapp.com).

## How it Works ##

A new user shares the start and end dates for their trip and the app generates a custom itinerary, proposing roughly equidistant campsites for the ~2-3 week trip. These campsites can be changed or updated, and layover days can be included. Once the itinerary is finalized, you can go on your trip and not worry about keeping in touch. 

![Account creation](/public/img/welcomescreen.jpg "Account creation page")
![Automatic Itinerary](/public/img/itinerary.jpg "Itinerary generation")

Each morning, a scrapbook-style blog entry is generated using recent and seasonally appropriate trip reports from the relevant section of the trail, selected writings from the exact area from the legendary nature writers, ranger reports, weather data, and so on.

![Example blog entry](/public/img/blogpage.jpg "Example daily entry")
![Example blog entry](/public/img/blog2.jpg "Example daily entry")


## Tech Stack ##

[Hackathon Starter](https://david-dm.org/sahat/hackathon-starter): Node/Express, D3, HTML/jade, MongoDB. See our original mockups [here](/public/img/mockup1.jpg), [here](/public/img/mockup2.jpg), and [here](/public/img/mockup3.jpg). 

## Future Plans ##

Eventual optimizations include a social component to help plan resupplies and the ability to upload video updates on civilization days. The campsite data could also be included in a Mongo collection instead of called as a JSON object. On the itinerary page, a "share" button could allow input of a lit of email addresses with whom the user wishes to share their personalized link. The D3 map could allow dragging to modify the itinerary after initial generation. 

## License ##

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
