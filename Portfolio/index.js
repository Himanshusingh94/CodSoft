


var skillbars = document.querySelectorAll(".about-skill");


skillbars.forEach(skillbar => {
var Fill = skillbar.querySelector(".skill-bar hr");
const value = skillbar.querySelector(".lengthofbar p");

if(value){
const width = parseFloat(value.textContent);
console.log(width);
Fill.style.width = width +"%";
Fill.style.backgroundColor = '#3498db';
Fill.style.height = '10px';
}
});