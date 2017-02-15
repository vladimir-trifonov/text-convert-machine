# text-convert-machine

Implements a small text conversion queueing service (server and a very simple web interface) using Node.js and AngularJS, that allows to enter/paste rich text and request it's conversion to an HTML or PDF file.

The interface is very simple and comprises only of two screens: Conversions list and New conversion. 

## Implementation:

The server is built in Node.js and MongoDB;  
The web interface is be implemented using AngularJS 2;  
For the rich text editor is used Quill;

The server implements queuing system that accepts content conversion requests. It receives the request to convert the content from the client/web interface, puts that request on a queue and replies back to the client with information about the queued request. After the request is processed, an HTML/PDF file is placed in a publicly folder being served, and informs the client/web interface of it in some way.

Additionally, and for the sake of demonstration purposes only, a timeout to all requests is added, using the setTimeout method, like so:

HTML requests: 10 seconds of additional timeout;
PDF requests: 100 seconds of additional timeout;

Given this, the requests for HTML conversions have more priority than PDF conversions, meaning that if there is one PDF request followed by a few HTML requests on the queue, the system should make an effort to process the HTML ones first as they are quicker. (The priority policy, the number of HTML requests it processes/preempts over PDF, etc, can be defined.)

## How to run:

> npm install  
> mongod  
> npm start