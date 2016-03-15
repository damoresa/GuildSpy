# GuildSpy

Small application in order to track people logging in and out on the MMO Tibia.

I also used it in order to get in touch with NodeJS and Socket.IO.

## Usage

Once the site is deployed, as soon as you access the main page, you'll get notifications if the ammount of online players of any of the tracked guilds increases.

### Tools

Created with:

`NodeJS`: Server and basic platform.

`Express`: Static and http urls mappings.

`Request`: Generate POST requests from the server to check data on pages.

`Cheerio`: Parse data obtained from POST on a jQuery-stylish way.

`Socket.IO`: Real time communication between clients and the server so the server can notificate changes.

`Cron`: Program the site checker in order to track it's status.
