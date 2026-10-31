// Native horizontal scrolling keeps source release cards reachable on narrow screens.
for (const carousel of document.querySelectorAll('[data-slot="carousel"]')) {
 const viewport=carousel.querySelector('[data-slot="carousel-content"]');
 const previous=carousel.querySelector('[data-slot="carousel-previous"]');
 const next=carousel.querySelector('[data-slot="carousel-next"]');
 if(!viewport||!previous||!next)continue;
 const update=()=>{previous.disabled=viewport.scrollLeft<=1;next.disabled=viewport.scrollLeft+viewport.clientWidth>=viewport.scrollWidth-1};
 const step=()=>{const card=viewport.querySelector('[data-slot="carousel-item"]');return card?card.getBoundingClientRect().width+16:viewport.clientWidth};
 previous.addEventListener('click',()=>viewport.scrollBy({left:-step()}));
 next.addEventListener('click',()=>viewport.scrollBy({left:step()}));
 viewport.addEventListener('scroll',update,{passive:true});
 new ResizeObserver(update).observe(viewport);update();
}
