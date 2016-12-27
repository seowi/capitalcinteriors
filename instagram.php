<?php
    function get_string_between($string, $start, $end){
        $string = ' ' . $string;
        $ini = strpos($string, $start);
        if ($ini == 0) return '';
        $ini += strlen($start);
        $len = strpos($string, $end, $ini) - $ini;
        return substr($string, $ini, $len);
    }
    $instagram = file_get_contents("https://www.instagram.com/juan.j.carretero/");
    $instagramJSON = get_string_between($instagram, 'window._sharedData = ', ';</script>');
    $instagramArray = json_decode($instagramJSON,true);
    $instagramMedia = $instagramArray['entry_data']['ProfilePage'][0]['user']['media']['nodes'];
?>
<?php foreach ($instagramMedia as $photo): ?>
    <div class="col-md-3 col-sm-4 col-xs-6 portfolio-item">
        <a href="https://www.instagram.com/p/<?=$photo['code']?>/" target="_blank" class="portfolio-link" data-toggle="modal">
            <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                    <i class="fa fa-external-link fa-3x"></i>
                </div>
            </div>
            <img src="<?=$photo['thumbnail_src']?>" class="img-responsive" alt="">
        </a>
    </div>
<?php endforeach; ?>