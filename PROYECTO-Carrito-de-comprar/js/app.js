const carrito = document.querySelector('#carrito');
const listacurso = document.querySelector('#lista-cursos');
const conetidocarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');


let articulocarrito=[];


registroenevetos();
function registroenevetos(){
    //agrgar algo al carrito
    listacurso.addEventListener('click',agregarcurso);
    //evento para eliminar elementos del carrito
    carrito.addEventListener('click',eliminarelemento);

    //baciar todo el carrito
    vaciarCarrito.addEventListener('click',()=>{
        articulocarrito=[];
        limpiarcarrito();
    })
    
}
//funciones

function agregarcurso(e){
    
  e.preventDefault()
  if (e.target.classList.contains('agregar-carrito')) {
    const cursoselec= e.target.parentElement.parentElement;
    datoscusos(cursoselec)
  }      
}

//fuuncion que eliminina elemtos del carrito
function eliminarelemento(e){
    
  
    if(e.target.classList.contains('borrar-curso')){
         const borrar = e.target.getAttribute('data-id')
         //usuando filter para borrar por id
         articulocarrito = articulocarrito.filter( curso =>curso.id !==borrar)
         console.log(articulocarrito)
         

         carritoHTML();


    }
}




//leer datos cursos

function datoscusos(cursos){
    

    const infocurso ={
        imagen: cursos.querySelector('img'),
        titulo:cursos.querySelector('h4').textContent,
        precio: cursos.querySelector('p span').textContent,
        id:cursos.querySelector('a').getAttribute('data-id'),
        cantidad:1

    }
    //revisa si un elemeto ya existe
    const existe = articulocarrito.some((curso)=>{
       return curso.id===infocurso.id
       
    })
    if(existe){
        const curso = articulocarrito.map((cursoexistente)=>{
            if(cursoexistente.id===infocurso.id){
                cursoexistente.cantidad++;
                return cursoexistente;

            }else{
                return cursoexistente;
            }
        });
        articulocarrito=[...curso]


    }else{
        articulocarrito= [...articulocarrito,infocurso]

    }
   
   
    //agraga elementos al carrito
    


    

    carritoHTML();
}

//muestra el carrit compre en la html

function carritoHTML(){
     
    limpiarcarrito();
    
    articulocarrito.forEach((curso)=>{
        const row = document.createElement('tr');
        row.innerHTML=  '<td>' + '<img src="'+curso.imagen+'"/>' +'</td>'+
        '<td>' +curso.titulo+'</td>'+
        '<td>' +curso.precio+'</td>'+
        '<td>' +curso.cantidad+'</td>'+
        '<td>' +'<a href="#" class="borrar-curso" data-id="'+curso.id+'">X</a>'+'</td>';
        
        
        
        conetidocarrito.appendChild(row);
    });
}


function limpiarcarrito(){

    while(conetidocarrito.firstChild){
        conetidocarrito.removeChild(conetidocarrito.firstChild)
    }
}
   
