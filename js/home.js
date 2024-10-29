var slider; 
slider = document.querySelector('.slider')
var leftArrow;
var rightArrow;
 leftArrow = document.querySelector('.left');
 rightArrow = document.querySelector(`.right`);
var indicatorParents;
indicatorParents = document.querySelector('.controls ul');
 var sectionIndex = 0;

 function setIndex() {
    document.querySelector('.controls .selected').classList.remove('selected')
    slider.style.transform = 'translate(' + (sectionIndex) * -100 + '%)';
 }

 document.querySelectorAll('.controls li').forEach(function(indicator,ind) {
    indicator.addEventListener('click', function() {
        sectionIndex = ind;        
        setIndex();    
        indicator.classList.add('selected');
    })
 })
 
 leftArrow.addEventListener(`click`, function() {
     sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
     indicatorParents.children[sectionIndex].classList.add('selected');
     setIndex();   
 });

rightArrow.addEventListener(`click`, function() {
    sectionIndex = (sectionIndex < 2) ? sectionIndex + 1 : 2;   
    indicatorParents.children[sectionIndex].classList.add('selected');    
    setIndex();   
});

