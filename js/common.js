"use strict";

document.addEventListener("DOMContentLoaded", () => {

	const burgerWrapper = document.querySelector('.header--menu');
	const burger = burgerWrapper.querySelector('.header--menu__burger');

	burger.addEventListener('click', (e) => {
		e.preventDefault();
		burgerWrapper.classList.toggle('active');
		document.querySelector('html').classList.toggle('overflow');
	});

	const smoothHeight = (itemSelector, buttonSelector, contentSelector) => {
		const items = document.querySelectorAll(itemSelector);
	
		if (!items.length) return;
	
		const adjustHeight = (el, button, content) => {
			if (el.dataset.open === 'true') {
				button.classList.add('active');
				content.style.maxHeight = `${content.scrollHeight}px`;
			} else {
				button.classList.remove('active');
				content.style.maxHeight = '';
			}
		};
	
		const handleClick = (el, button, content) => {
			el.dataset.open = el.dataset.open !== 'true' ? 'true' : 'false';
			el.classList.toggle('active');
			button.classList.toggle('active');
			adjustHeight(el, button, content);
		};
	
		items.forEach((el) => {
			const button = el.querySelector(buttonSelector);
			const content = el.querySelector(contentSelector);
			adjustHeight(el, button, content);
	
			button.addEventListener('click', () => {
				handleClick(el, button, content);
			});
		});
	
		const onResize = () => {
			if (window.innerWidth <= 1439) {
				items.forEach((el) => {
					const button = el.querySelector(buttonSelector);
					const content = el.querySelector(contentSelector);
					adjustHeight(el, button, content);
				});
			} else {
				items.forEach((el) => {
					el.classList.remove('active');
					const content = el.querySelector(contentSelector);
					content.style.maxHeight = '';
				});
			}
		};
	
		window.addEventListener('resize', onResize);
	};
	
	smoothHeight('.main--technologies__item', '.main--technologies__item--title', '.main--technologies__item span');
	

	const splideElementClients = document.querySelector('.splide--clients');
	if (splideElementClients) {
		const splide = new Splide( '.splide--clients', {
			type: 'loop',
			width: '82%',
			gap: '50px',
			perPage: 1,
			speed: '900',
			autoHeight: true,
			breakpoints: {
				1439: {
					width: '100%',
				}
			}
		} );
	
		splide.mount();
	
		const activeSlide = splide.Components.Elements.slides[0];
		const activeSlideHeight = activeSlide.offsetHeight;
	
		splide.Components.Elements.track.style.maxHeight = `${activeSlideHeight}px`;
		splide.Components.Elements.list.style.maxHeight = `${activeSlideHeight}px`;
		
		splide.on('move', (newIndex) => {
			const activeSlide = splide.Components.Elements.slides[newIndex];
			const activeSlideHeight = activeSlide.offsetHeight;
		
			splide.Components.Elements.track.style.maxHeight = `${activeSlideHeight}px`;
			splide.Components.Elements.list.style.maxHeight = `${activeSlideHeight}px`;
		});
	}

	const splideElementNews = document.querySelector('.splide--news');
	if(splideElementNews){
		const splideNews = new Splide( '.splide--news', {
			type: 'slide',
			perPage: 2,
			speed: '900',
			pagination: false,
			autoWidth: true,
			role: 'group',
			breakpoints: {
				1200: {
					perPage: 1,
				}
			}
		} );
	
		splideNews.mount();
	}

	const splideElementProject = document.querySelector('.splide--project');
	if (splideElementProject) {
		const splide1 = new Splide('.splide--project', {
			type: 'loop',
			perPage: 1,
			speed: '900',
			autoHeight: true,
		});
	
		splide1.mount();
	
		splide1.on('mounted', () => {
			const activeSlide1 = splide1.Components.Elements.slides[splide1.index];
			const activeSlideHeight1 = activeSlide1.offsetHeight;

			splide1.Components.Elements.track.style.maxHeight = `${activeSlideHeight1}px`;
			splide1.Components.Elements.list.style.maxHeight = `${activeSlideHeight1}px`;
		});

		splide1.on('move', (newIndex1) => {
			const activeSlide1 = splide1.Components.Elements.slides[newIndex1];
			const activeSlideHeight1 = activeSlide1.offsetHeight;
		
			splide1.Components.Elements.track.style.maxHeight = `${activeSlideHeight1}px`;
			splide1.Components.Elements.list.style.maxHeight = `${activeSlideHeight1}px`;
		});
	}

	const splideAnotherProjects = document.querySelector('.splide--anotherProjects');
	let splideProjects = null;
	
	function initSplide() {
		splideProjects = new Splide('.splide--anotherProjects', {
			type: 'loop',
			perPage: 2,
			gap: '20px',
			speed: 900,
			arrows: false,
			pagination: true,
			breakpoints: {
				768: {
					perPage: 1,
				}
			}
		});
		
		if (window.innerWidth > 620) {
			splideProjects.mount();
		} else {
			splideProjects.destroy();
		}
	}
	
	if (splideAnotherProjects) {
		initSplide();
		window.addEventListener('resize', function() {
			if (window.innerWidth > 620 && !splideProjects) {
				initSplide();
			} else if (window.innerWidth <= 620 && splideProjects) {
				splideProjects.destroy();
				splideProjects = null;
			}
		});
	}
});
