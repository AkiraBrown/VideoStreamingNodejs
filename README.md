# NodeJs Video Player

This project is simply returning back a html file containing a video player, that can stream a video file from the backend; using NodeJs.

## Routes

- localhost:8080/stream/Skiing
- localhost:8080/stream/Skateboarding
- localhost:8080/stream/City

## What Went Well (WWW)

- Learning more about request headers and passing through a start and end point for data
- Creating a pipeline for nodejs to pass chunks of data to the frontend
- Rendering out a video player on the backend to make it easier for the frontend to play the vdeo.

## Even Better If (EBI)

- Use css in the index.html file to style the video player and add custom events. e.g go back ten seconds
- Test if this API works at production
  - If it does, review the quality of the video
  - Stress test it with a variety of resolution videos
  - Check performance with longer videos and different framerates
- Create a frontend to demonstrate it's use in a vite-react app
- Instead a of an object for the filepaths expand this to a sql table that enables a more dynamic table of videos and video paths.

Source for footage:[Pexels](https://www.pexels.com/videos/)
