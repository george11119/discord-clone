## File Structure of Controllers Folder

Using model example:

- example.routes.ts: Contains the api endpoints of the model
- example.socket.ts: Contains the socket endpoints of the model
- example.db.ts: Contains the logic to fetch the model from the database

If a model does not have a need for a socket connection, the file will only have a example.routes.ts file which will
contain both the database fetching and the api endpoints of the model.
