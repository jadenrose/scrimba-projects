# Image Carousel
*This is a refactor/redesign of the javascript image carousel that you make as a part of the front-end developer career path on [scrimba.com](https://scrimba.com/)*

## Original Features
### CSS
* Used keyframes and opactity to smoothly transition between images

### Javascript
* Three divs with images that can be hiddden/shown as sliders by using 2 javascript buttons

## Added Features
### HTML
* Changed the typeface button symbols to SVG images
* Added banner text and an empty ul (filled in by Javascript) to each image div
* Imported Google Font 'Poppins' for use on the whole page, at weights 300 (light) and 900 (black)

### CSS
* Overlaid the banner text and empty list on top of the image using `position: absolute`
* Styled the next/previous buttons to my taste
* Aligned all absolute elements appropriately
* Brought down the opacity on overlay elements
* Changed the `opacity` fade-in animation to a `translateX()` slide-in animation

### Javascript
* Differentiated between clicking the "next" button and the "previous" button for the slidein animation
  * adds class `carousel-item-hidden-right` and `carousel-item-hidden-left` to the slide element depending on which button is pressed
* Adds the slide position indicator dots as styled list items to the empty "dots" ul's, styles the active dot as pure white
* Added a timeout function to automatically advance the slides every 8 seconds until the user clicks a button, then it stays on the selected slide
