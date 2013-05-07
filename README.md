xNav
====

jQuery plugin that allows you to create a multi-page website with one HTML file. 

Installation
---

xNav is not designed to be something you drag and drop into your project and it "just" works. This is because xNav is more than just an effect. Instead, xNav is a way to help you structure your code and make the user experience better by not forcing the browser to reload content that doesn't change throughout the site (like the navigation, footer, etc).

To implement xNav into your project, you need to have at least a ```<ul>``` element to act as your menu, a containing ```<div>```, and a set of "content" ```<div>```'s. See the code below:

```html
  <ul>
    <li><a href="#container1">Container 1</a></li>
    <li><a href="#container2">Container 2</a></li>
  </ul>
  <div id="content-pages">
    <div class="content" id="container1">
  	  <p>Content Container 1</p>
  	</div>
  <div id="container2">
  		<p>Content Container 2</p>
  </div>
</div>
```
After that include the xNav.js near your ```</body>``` tag and set the configuration options inside of xNav.js (<em>note that this is changing incredibly soon</em>).

xNav is still in the early stages of development and shouldn't be used on most production sites right now. I'm still working on making this easier to use and scalable across more than just one file sites.

So in short, it's great if you know jQuery and you want to put up a **small** site with a **small amount** of data. Otherwise, you have the potential of making the user experience bad just because the client will be processing a lot of GET requests. 

xNav Configuration Options
---

These are the options that you can pass to xNav as an option in the xNav.init function.

```effect```: Any jQuery effect. The default is 'toggle'.

```speed```: The speed of the effect in milliseconds. Undefined by default because jQuery sets it automatically.

```menuItems```: The valid jQuery selector of your menu list items. Required. Example: ```$('#menu li')```

```contentContainer```: The valid jQuery selector of your data set's parent ```<div>```. Required.

```navHelper```: Accepts ```true``` or ```false```. This will turn on the navigation helper. 

```defaultLink```: The link to the data set that the navHelper with position itself with on load. Link numbers are not zero based.

```animatedNavHelper```: Accepts ```true``` or ```false```. This will animate the movements of the navHelper.

```animatedNavHelperSpeed```: The speed of the navHelper's animation in milliseconds. Automatically set to ```500```.

```isVertical```: Accepts ```true``` or ```false```. If you're using a vertical menu, this needs to be turned on.

Contributing
---
Anyone is welcome to contribute.
