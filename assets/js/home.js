(function($) {
    $(document).ready(function() {
        var lastSelected = localStorage.getItem('lastSelected');
        if (lastSelected === null) {
            lastSelected = '1';
        } else {
            lastSelected = localStorage.getItem('lastSelected');
        }

        var animation = bodymovin.loadAnimation({
            container: document.getElementById('bm'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://bitbucket.org/kyawhtut-cu/json-file/raw/master/animation/atsy-loading.json'
        });

        var animation = bodymovin.loadAnimation({
            container: document.getElementById('pageLoading'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://bitbucket.org/kyawhtut-cu/json-file/raw/master/animation/atsy-loading.json'
        });
        $('.pageLoading').hide();

        $(".list-group").on('click', 'li', function() {
            refreshMenu($(this).attr('value'));
        });

        $('#navMenu').on('click', 'li', function() {
            // $('#navbarNavDropdown').hide();
            refreshMenu($(this).attr('value'));
        });

        var drawerMenu = [
            {
                key: 1,
                title: "Unapprove Dark Site User"
            },
            {
                key: 2,
                title: "Dark Site User"
            },
            {
                key: 3,
                title: "Unapprove Premium User"
            },
            {
                key: 4,
                title: "Premium User"
            },
            {
                key: 5,
                title: "All User"
            },
            {
                key: 6,
                title: "Unavaliable Paid Channel"
            },
            {
                key: 7,
                title: "Paid Channel"
            }
        ];

        $.each(drawerMenu, function(key, val) {
            var feature = $('<li>', {
                'class': 'list-group-item',
                'value': `${val.key}`
            });
            if (lastSelected == val.key) {
                feature = $('<li>', {
                    'class': 'list-group-item active',
                    'value': `${val.key}`
                });
                $('#userPage').empty();
                $('#channelList').empty();
                if(val.key == 6 || val.key == 7) {
                    $('#channelList').append(getUnavaliableContent(val.key));
                }
                getUser(val.key);
            }
            feature.text(val.title);
            $('.list-group').append(feature);

            var navFeature = $('<li>', {
                'class': 'nav-item',
                'value': `${val.key}`,
                'data-toggle': 'collapse',
                'data-target': '#navbarNavDropdown',
                'aria-controls': 'navbarNavDropdown'
            });
            if (lastSelected == val.key) {
                navFeature = $('<li>', {
                    'class': 'nav-item active',
                    'value': `${val.key}`,
                    'data-toggle': 'collapse',
                    'data-target': '#navbarNavDropdown',
                    'aria-controls': 'navbarNavDropdown'
                });
            }
            var a = $('<a>', {
                'class': 'nav-link'
            });
            a.text(val.title);
            navFeature.append(a);
            $('#navMenu').append(navFeature);
        });

        $('.whole-page-loading').hide();

        function refreshMenu(value) {
            $('#navMenu li').each(function() {
                if (value != $(this).attr('value')) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }
            });
            $('.list-group li').each(function() {
                if (value != $(this).attr('value')) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }
            });

            localStorage.setItem("lastSelected", value);
            $('#userPage').empty();
            $('#channelList').empty();
            if(value == 6 || value == 7) {
                $('#channelList').append(getUnavaliableContent(value));
                return;
            }
            getUser(value);
        }

        function getUnavaliableContent(index) {
            var title = "Paid Channel";
            if(index == 6) {
                title = "Unavaliable Paid Channel";
            }
            return `<div class="jumbotron" style="flex: 0 0 100%!important; max-width: 100%!important; background: white!important;"><h1 class="display-4">${title}</h1><p class="lead">လက်ရှိအချိန်တွင် မရနိုင်သေးပါဘူး။</p></div>`;
        }
    });
})(jQuery);
