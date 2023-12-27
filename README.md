<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> A mobile app for ordering coffee on-the-go, making it easier for coffee lovers to get their favorite beverages without waiting in line.
>
> Coffee Express aims to streamline the coffee-ordering process by providing a user-friendly platform for customers to place orders and pick up their coffee at their convenience. We believe in enhancing the coffee experience by saving time and ensuring customer satisfaction.

### User Stories

#Passenger User Stories:

. As a passenger, I want to view the real-time location of the bus on the map so that I can plan my departure accordingly.

. As a passenger, I want to see the availability of seats on the bus in real-time so that I can choose a bus with available seats.

. As a passenger, I want to receive notifications when my booked bus is about to arrive so that I can be ready for boarding.

. As a passenger, I want to view the details of my booked seat (location, number, etc.) so that I can easily find it on the bus.

. As a passenger, I want to receive a notification after the journey ends, prompting me to rate the service and provide feedback.

. As a passenger, I want to be able to communicate with the driver in case of any issues or special requests during the journey.

#Driver User Stories:
. As a driver, I want to view the list of booked passengers and their seat numbers so that I can ensure a smooth boarding process.

. As a driver, I want to receive notifications when passengers are waiting at the pickup point so that I can manage the schedule efficiently.

. As a driver, I want to view the route and expected arrival time at each stop to provide accurate information to passengers.

. As a driver, I want to receive notifications when passengers send messages or have special requests so that I can respond appropriately.

. As a driver, I want to be able to mark a seat as occupied or vacant to keep the seat availability information up-to-date.

#Admin User Stories:
. As an admin, I want to monitor the real-time location of all buses on the system to ensure smooth operations.

. As an admin, I want to receive notifications for any critical issues reported by passengers or drivers.

. As an admin, I want to view and analyze passenger ratings and feedback for each journey to assess overall service quality.

. As an admin, I want to have access to a chat interface where I can communicate with both drivers and passengers to address any concerns.

. As an admin, I want to be able to update bus schedules, routes, and other relevant information in the system.
<br><br>

<!-- Prototyping -->
<img src="./readme/title3.svg"/>

> We made B-route by drawing and testing ideas until we got a design that's simple to use. It helps you track buses, check seats, and chat easily between admins, drivers, and passengers.

### Wireframes

| Login screen                            | Register screen                       | Landing screen                        |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

### Mockups

| Home screen                             | Menu Screen                           | Order Screen                          |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Implementation -->
<img src="./readme/title4.svg"/>

> Using the wireframes and mockups as a guide, we implemented the B-ROUTE app with the following features:

### User Screens (Mobile)

| Login screen                              | Register screen                         | Landing screen                          | Loading screen                          |
| ----------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |
| Home screen                               | Menu Screen                             | Order Screen                            | Checkout Screen                         |
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |

### Admin Screens (Web)

| Login screen                            | Register screen                       | Landing screen                        |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |
| Home screen                             | Menu Screen                           | Order Screen                          |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Tech stack -->
<img src="./readme/title5.svg"/>

### Coffee Express is built using the following technologies:

- This project uses the [Flutter app development framework](https://flutter.dev/). Flutter is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.
- For persistent storage (database), the app uses the [Hive](https://hivedb.dev/) package which allows the app to create a custom storage schema and save it to a local database.
- To send local push notifications, the app uses the [flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications) package which supports Android, iOS, and macOS.
  - 🚨 Currently, notifications aren't working on macOS. This is a known issue that we are working to resolve!
- The app uses the font ["Work Sans"](https://fonts.google.com/specimen/Work+Sans) as its main font, and the design of the app adheres to the material design guidelines.

<br><br>

<!-- How to run -->
<img src="./readme/title6.svg"/>

> To set up Coffee Express locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = "ENTER YOUR API";
   ```

Now, you should be able to run Coffee Express locally and explore its features.
