document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Experience Tabs ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const jobPanels = document.querySelectorAll('.job-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            jobPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const panel = document.getElementById(targetId);
            if(panel) panel.classList.add('active');
        });
    });

    // --- Project Rendering Logic ---
    function renderProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid || typeof projectsData === 'undefined') return;

        grid.innerHTML = ''; // Clear existing content

        projectsData.forEach((project, index) => {
            const delay = (index % 3) * 100;
            
            // Build Links HTML
            let linksHtml = '';
            if (project.urls && project.urls.length > 0) {
                linksHtml = '<div class="project-links">';
                project.urls.forEach(url => {
                    let icon = "fas fa-external-link-alt";
                    let label = "Visit";
                    const lowUrl = url.toLowerCase();
                    
                    if (lowUrl.includes("play.google.com")) { icon = "fab fa-google-play"; label = "Google Play"; }
                    else if (lowUrl.includes("apple.com") || lowUrl.includes("itunes.apple.com")) { icon = "fab fa-apple"; label = "App Store"; }
                    else if (lowUrl.includes("github.com")) { icon = "fab fa-github"; label = "Source Code"; }
                    else if (lowUrl.includes("youtube.com") || lowUrl.includes("youtu.be")) { icon = "fab fa-youtube"; label = "YouTube"; }
                    else if (lowUrl.includes("steampowered.com") || lowUrl.includes("steamcommunity.com")) { icon = "fab fa-steam"; label = "Steam Store"; }
                    else if (lowUrl.includes("assetstore.unity.com") || lowUrl.includes("unity.com")) { icon = "fab fa-unity"; label = "Asset Store"; }
                    
                    linksHtml += `
                        <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-button" title="${label}">
                            <i class="${icon}"></i>
                            <span>${label}</span>
                        </a>`;
                });
                linksHtml += '</div>';
            }

            // Build Media HTML
            let mediaHtml = '';
            if (project.media && project.media.length > 0) {
                project.media.forEach(m => {
                    const isYouTube = m.path.includes('youtube.com') || m.path.includes('youtu.be') || m.type === 'youtube';
                    const isDrive = m.path.includes('drive.google.com');

                    if (isYouTube || isDrive) {
                        const platformName = isYouTube ? 'YouTube' : 'Google Drive';
                        const iconClass = isYouTube ? 'fab fa-youtube' : 'fas fa-play-circle';
                        
                        mediaHtml += `
                            <div class="media-container">
                                <div class="external-video-placeholder">
                                    <i class="${iconClass}"></i>
                                    <p>Video hosted on ${platformName}</p>
                                    <a href="${m.path}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Watch Video</a>
                                </div>
                            </div>`;
                    } else if (m.type === 'video') {
                        let videoType = 'video/mp4'; // Default
                        if (m.path.endsWith('.webm')) videoType = 'video/webm';
                        else if (m.path.endsWith('.ogg')) videoType = 'video/ogg';
                        else if (m.path.endsWith('.mov')) videoType = 'video/quicktime';
                        
                        mediaHtml += `
                            <div class="media-container">
                                <video autoplay loop muted playsinline class="project-video">
                                    <source src="${m.path}" type="${videoType}">
                                </video>
                                <div class="media-overlay">
                                    <i class="fas fa-play-circle"></i>
                                </div>
                            </div>`;
                    } else {
                        mediaHtml += `
                            <div class="media-container">
                                <img src="${m.path}" alt="${project.name}" style="width: 100%; height: auto; display: block; object-fit: cover;">
                                <div class="media-overlay">
                                    <i class="fas fa-eye"></i>
                                </div>
                            </div>`;
                    }
                });
            } else {
                mediaHtml = `
                    <div class="media-container">
                        <div class="image-fallback">
                            <i class="fas fa-gamepad"></i>
                            <span>${project.name}</span>
                        </div>
                    </div>`;
            }

            // Build Role HTML
            let roleHtml = '';
            if (project.role && project.role.length > 0) {
                roleHtml = `
                    <div class="project-role">
                        <h4>My Role:</h4>
                        <ul>
                            ${project.role.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                    </div>`;
            }

            // Build Tech HTML
            let techHtml = '';
            if (project.tech && project.tech.length > 0) {
                techHtml = `
                    <ul class="project-tech-list">
                        ${project.tech.map(t => `<li>${t}</li>`).join('')}
                    </ul>`;
            }

            const cardHtml = `
                <div class="project-card glass-card reveal tilt-card" style="transition-delay: ${delay}ms;">
                    <div class="project-media">
                        ${mediaHtml}
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">${project.name}</h3>
                            ${linksHtml}
                        </div>
                        <div class="project-description">
                            <p>${project.description}</p>
                        </div>
                        ${roleHtml}
                        ${techHtml}
                    </div>
                </div>`;
            
            grid.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    // --- Interactive Features Initialization ---
    function initInteractiveFeatures() {
        // --- Intersection Observer ---
        const observerOptions = { threshold: 0.15 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target.classList.contains('section-heading')) {
                        entry.target.classList.add('visible');
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // --- 3D Tilt Effect ---
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });

        // --- Project Modal Logic ---
        const modal = document.getElementById('project-modal');
        const modalClose = document.querySelector('.modal-close');
        
        if(modal) {
            const modalMediaContainer = document.getElementById('modal-media-container');
            const modalTitle = document.getElementById('modal-title');
            const modalLinks = document.getElementById('modal-links');
            const modalDescription = document.getElementById('modal-description');
            const modalRole = document.getElementById('modal-role');
            const modalTech = document.getElementById('modal-tech');
            const prevBtn = document.getElementById('modal-prev-btn');
            const nextBtn = document.getElementById('modal-next-btn');

            function updateModalSliderButtons() {
                if(!modalMediaContainer) return;
                const scrollLeft = modalMediaContainer.scrollLeft;
                const maxScroll = modalMediaContainer.scrollWidth - modalMediaContainer.clientWidth;
                if(scrollLeft > 10) prevBtn.classList.add('visible');
                else prevBtn.classList.remove('visible');
                if(maxScroll > 10 && scrollLeft < maxScroll - 10) nextBtn.classList.add('visible');
                else nextBtn.classList.remove('visible');
            }

            document.querySelectorAll('.project-card').forEach(card => {
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    if(e.target.closest('a') || window.isMediaDragging) {
                        setTimeout(() => window.isMediaDragging = false, 50);
                        return;
                    }
                    modalTitle.innerHTML = card.querySelector('.project-title').innerHTML;
                    modalLinks.innerHTML = card.querySelector('.project-links') ? card.querySelector('.project-links').innerHTML : '';
                    modalDescription.innerHTML = card.querySelector('.project-description').innerHTML;
                    modalRole.innerHTML = card.querySelector('.project-role') ? card.querySelector('.project-role').innerHTML : '';
                    modalTech.innerHTML = card.querySelector('.project-tech-list') ? card.querySelector('.project-tech-list').outerHTML : '';
                    
                    let mediaHtml = '';
                    card.querySelectorAll('.media-container').forEach(mc => mediaHtml += mc.outerHTML);
                    modalMediaContainer.innerHTML = mediaHtml;

                    modalMediaContainer.querySelectorAll('video').forEach(v => {
                        v.play().catch(e => console.log("Autoplay prevented:", e));
                    });

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    setTimeout(updateModalSliderButtons, 50);
                });
            });

            modalMediaContainer.addEventListener('scroll', updateModalSliderButtons);
            if(prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => modalMediaContainer.scrollBy({ left: -modalMediaContainer.clientWidth, behavior: 'smooth' }));
                nextBtn.addEventListener('click', () => modalMediaContainer.scrollBy({ left: modalMediaContainer.clientWidth, behavior: 'smooth' }));
            }

            const closeModal = () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                modalMediaContainer.querySelectorAll('video').forEach(v => v.pause());
                setTimeout(() => {
                    modalMediaContainer.innerHTML = '';
                    updateModalSliderButtons();
                }, 300);
            };

            modalClose.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
            document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });
        }

        // --- Drag to Scroll ---
        window.isMediaDragging = false;
        document.querySelectorAll('.project-media').forEach(slider => {
            let isDown = false, startX, scrollLeft, didMove = false;
            slider.addEventListener('mousedown', (e) => {
                isDown = true; didMove = false;
                slider.style.cursor = 'grabbing';
                slider.style.scrollSnapType = 'none';
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            slider.addEventListener('mouseleave', () => {
                if(!isDown) return; isDown = false;
                slider.style.cursor = 'default';
                slider.style.scrollSnapType = 'x mandatory';
            });
            slider.addEventListener('mouseup', () => {
                if(!isDown) return; isDown = false;
                slider.style.cursor = 'default';
                slider.style.scrollSnapType = 'x mandatory';
                if(didMove) window.isMediaDragging = true;
            });
            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 1.5; 
                if(Math.abs(walk) > 5) didMove = true;
                slider.scrollLeft = scrollLeft - walk;
            });
        });
    }

    // --- Phone Number Copy Logic ---
    const phoneBtn = document.getElementById('phone-copy');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', () => {
            const phoneNumber = "+91 7561982164";
            navigator.clipboard.writeText(phoneNumber).then(() => {
                // Show Toast
                let toast = document.querySelector('.toast');
                if (!toast) {
                    toast = document.createElement('div');
                    toast.className = 'toast';
                    document.body.appendChild(toast);
                }
                toast.textContent = `Copied ${phoneNumber}`;
                toast.classList.add('show');
                
                // Icon feedback
                const originalHtml = phoneBtn.innerHTML;
                phoneBtn.innerHTML = '<i class="fas fa-check" style="color: var(--primary);"></i>';
                
                setTimeout(() => {
                    toast.classList.remove('show');
                    phoneBtn.innerHTML = originalHtml;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    // --- Email Button Logic ---
    const emailBtn = document.getElementById('email-btn');
    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            const email = "pankajkumar76611@gmail.com";
            
            // Show Toast
            let toast = document.querySelector('.toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.className = 'toast';
                document.body.appendChild(toast);
            }
            
            // Phase 1: Opening Mail
            toast.textContent = "Opening Mail...";
            toast.classList.add('show');
            
            // Copy email to clipboard
            navigator.clipboard.writeText(email).then(() => {
                setTimeout(() => {
                    toast.textContent = "Copied Email!";
                }, 1000);
                
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            });
        });
    }

    // --- Hover to Play Logic ---
    function setupHoverPlay() {
        document.querySelectorAll('.project-card').forEach(card => {
            const videos = card.querySelectorAll('video');
            
            card.addEventListener('mouseenter', () => {
                videos.forEach(v => {
                    v.muted = true;
                    v.play().catch(() => {});
                });
            });

            card.addEventListener('mouseleave', () => {
                videos.forEach(v => v.pause());
            });
        });
    }

    // --- Execution ---
    renderProjects();
    initInteractiveFeatures();
    setupHoverPlay();

    // Global interaction to "unlock" video playback for browsers
    const unlockVideos = () => {
        document.querySelectorAll('video').forEach(v => {
            v.play().then(() => {
                v.pause(); // Just "warming up" the video for later hover play
                v.currentTime = 0;
            }).catch(() => {});
        });
        document.body.removeEventListener('click', unlockVideos);
        document.body.removeEventListener('touchstart', unlockVideos);
    };
    document.body.addEventListener('click', unlockVideos);
    document.body.addEventListener('touchstart', unlockVideos);

    // --- Dynamic Height Matching & Video Setup ---
    function syncProjectMediaHeights() {
        document.querySelectorAll('.project-media').forEach(container => {
            const firstMedia = container.querySelector('.media-container:first-child img, .media-container:first-child video, .media-container:first-child iframe');
            
            if (firstMedia) {
                const setHeight = () => {
                    const height = firstMedia.offsetHeight;
                    if (height > 0) {
                        container.style.height = height + 'px';
                        container.querySelectorAll('.media-container:not(:first-child) img, .media-container:not(:first-child) video, .media-container:not(:first-child) iframe').forEach(m => {
                            m.style.height = height + 'px';
                            m.style.objectFit = 'cover';
                        });
                    }
                };
                
                if (firstMedia.tagName === 'VIDEO' || firstMedia.tagName === 'IFRAME') {
                    if (firstMedia.tagName === 'IFRAME') {
                        firstMedia.onload = setHeight;
                    } else {
                        firstMedia.onloadedmetadata = setHeight;
                    }
                } else {
                    if (firstMedia.complete) setHeight();
                    else firstMedia.onload = setHeight;
                }
                setHeight();
            }
        });
    }

    window.addEventListener('load', syncProjectMediaHeights);
    window.addEventListener('resize', syncProjectMediaHeights);
    setTimeout(syncProjectMediaHeights, 1000);

    // Initial load animation for hero
    setTimeout(() => {
        const hero = document.querySelector('.hero-content');
        if(hero) hero.classList.add('active');
    }, 100);

});

