const studentList = document.querySelector(".student-list").children
const studentsPerPage = 10

const ShowPage = (list, pageNumber) => {
   let start = (pageNumber * studentsPerPage) - studentsPerPage;
   let end = pageNumber * studentsPerPage;
   for(let i = 0; i < list.length; i++){
      i >= start && i < end ? list[i].style.display = "block" : list[i].style.display = "none";
   }
}

const appendLinks = (list) => {
   const site = document.querySelector('.page');
   const pagination = document.createElement('div');
   let pagesList = document.createElement('ul');
   let pages = Math.ceil(list.length / studentsPerPage);
   pagination.classList.add('pagination');
   pagination.appendChild(pagesList);
   site.appendChild(pagination);
   
   for(i = 1; i <= pages; i++){
      let icon = document.createElement('li');
      let number = document.createElement('a');
      number.href = "#";
      number.textContent = i;
      icon.appendChild(number)
      pagesList.appendChild(icon);
      number.addEventListener('click',(e) => {
         let pageLinks = document.getElementsByClassName('active')
         for(l = 0; l < pageLinks.length; l++){
            pageLinks[l].classList.remove('active');
         }
         ShowPage(list,number.textContent)
         e.target.classList.add('active');
      })
   }
}

ShowPage(studentList,1);
appendLinks(studentList);