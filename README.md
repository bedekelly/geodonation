# GeoDonation

GeoDonation was a hack built at Manchester's GreatUniHack 2015, a 24h hackathon. It aimed to solve the the problem that charities face of location-based analysis -- where most of their donations come from, and how they're distributed.

We wanted to provide a friendly, usable interface for charities to see exactly where all their donations came from. In order to make this a reality, we put careful thought into our system architecture, especially with respect to making a scalable and extensible system.

For the charity-visible interface, we kept it simple - a single URL, formed with the charity's unique JustGiving identifier, takes a charity to a page where they see an interactive Google Map with the location (and type - more on this later!) of each donation.

*Shown here: Oxfam's view, panned down slightly at https://geodonation.xyz/view/13441*

![Oxfam's donation viewer](http://i.imgur.com/bs3ernS.png)

For the donation side of things, we wanted to keep the system decoupled in such a way that charities could add new donation methods with a minimum of effort.

In order to do this, we created a RESTful API using Python and Flask. This exposed a single "donation" resource, which accepted POST and GET requests, to register and return donations respectively. Charities should be able to provide multiple different methods of donation which simply send a POST request to this service.

To demonstrate the flexibility of this service, we created three separate projects using a mix of wearable, web and hardware technologies.

The first was a hardware project. Using a small, inexpensive prototyping electronics board called the Tessel, we created a rough analog to a donation box (since we didn't have one to hand, we used a Pringles can!). To track the donations we used its accelerometer feature, so each time someone dropped a coin in the can, it sent off the data to our server. We made sure to add a timeout, so multiple-coin donations weren't sent separately.

*Shown here: the kind of thing we wish we'd had to hand!*

![Donation box](https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.churchsupplier.com%2Fshopsite_sc%2Fstore%2Fhtml%2Fmedia%2Fdonation_boxes%2F2013-bk-MI.jpg&f=1)

The second was a Pebble smartwatch app. Instead of registering the donation automatically, this required the user to select the charity they'd just donated to. We envisioned this for more frequent donators, who might be open to helping charities by providing anonymous location statistics.

*Shown here: the introductory splash screen and the charity selection screen*

![Pebble app](http://i.imgur.com/jE4vZJd.png)
![Pebble app](http://i.imgur.com/w9owpCJ.png)

Finally, we made a URL redirect service, coupled with a friendly QR code generator.

![QR code generator](http://i.imgur.com/xRFZA17.png)

We felt this would be most used by people who donate on the go - whether it's scanned from an advert or from a leaflet handed to them in the street. From a friendly 'redirect' page, which captures the donator's location, they are redirected to an arbitrary URL specified by the charity. As well as being used for donation pages, this is useful for more general analysis of where most QR-scans (or clicks, NFC-taps etc.) are coming from.

*Shown: Chrome asking the user to share location information, and the redirect page itself*

![Location info request](http://i.imgur.com/F5QiUt9.png)

![Redirect page](http://i.imgur.com/eCQwqNg.png)

With these three example uses, we felt like we showed off a good selection of the potential uses for our API. Since the redirect page generation was all handled on the "backend", a stretch-goal of ours was to create an NFC tag generator in the same vein as the QR code generator. In the end, we didn't quite get the chance within the 24 hours available, but the redirect-URL creation API we built is every bit as flexible as the location data storage.

Our app was inspired by the challenges set by Bloomberg and JustGiving: to solve a real problem, and to do some good in the world respectively. Although not quite production-ready, we like to think that this project found a happy medium between the two.
