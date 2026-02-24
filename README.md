1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Answer: getElementById- is used to get one single element by using its ID.
<!-- README te html code jay na output chole jay ei jonno comment kore dilam -->
<!-- html code -->
<!-- <div id="title">Hello World</div> 
<!-- js code -->
 <!-- let titleTEXT = document.getElementById("title");
console.log(titleTEXT); --> 

getElementsByClassName- is used get all elements with the given class name.
<!-- html code -->
<!-- <p class="fruit">Am</p>
<p class="fruit">Jam</p>
<p class="fruit">Lichu</p> -->
<!-- js code -->
<!-- let fruits = document.getElementsByClassName("fruit");
console.log(fruits); -->

querySelector- is used to select the first matching element using a CSS selector(class,id etc).
<!-- html code -->
<!-- <div class="item"></div>
<div class="item"></div> -->
<!-- js code -->
<!-- let firstItem = document.querySelector(".item");
console.log(firstItem); -->     
 querySelectorAll- is used to select the all matching element using a css selector.
<!-- let allItems = document.querySelectorAll(".item");
console.log(allItems);  -->
2. How do you create and insert a new element into the DOM?
<!-- Answer: let div = document.createElement('div');
        div.className = 'my-card';
        div.textContent = 'This is a new card';
        document.body.appendChild(div); -->

3. What is Event Bubbling? And how does it work?
Answer: Event Bubbling is a type of event propagation in the DOM where an event bubble up from target element to parent element.
<!-- html code -->
<!-- <div id="parent">
    <button id="child">Click Me</button>
</div> -->

<!-- js code -->
<!-- document.getElementById("parent").addEventListener("click",()=>{
    console.log("Parent clicked");
});
document.getElementById("child").addEventListener("click",()=>{
    console.log("Child clicked");
}); -->

<!-- output -->
if bubbling is not stopped:
Child clicked
Parent clicked

4. What is Event Delegation in JavaScript? Why is it useful?
Answer: Event Delegation is a technique where a parent handles events of child elements using bubbling.
It is useful for dynamic content. it reduces number of event listeners.
<!-- html code -->
<!-- <ul id="navbar">
  <li id="item1">Home</li>
  <li id="item2">About</li>
  <li id="item3">Contact</li>
</ul> -->

<!-- js code -->
<!-- const navbar = document.getElementById("navbar");
navbar.addEventListener("click", (event)=>{
    if(event.target.tagName === "LI") {
        console.log("Clicked item:", event.target.id);
    }
}); -->

5. What is the difference between preventDefault() and stopPropagation() methods?
Answer: preventDefault() stops the browser's default action whereas stopPropagation() stops the event to go up or down in the DOM tree.
<!-- code -->
<!-- event.preventDefault();  
event.stopPropagation();  -->