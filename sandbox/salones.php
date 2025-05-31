<?php
    include_once '../api/config/conection.php';
    $data = file_get_contents("salones_new.json");
    $salo = json_decode($data);

    $sql = "SELECT * FROM cal_items ORDER BY last_updated";
    // $sql = "SELECT * FROM cal_items WHERE caption LIKE '%gua%' ORDER BY last_updated";
    // $sql = "SELECT * FROM cal_items WHERE caption LIKE '%hol%' ORDER BY last_updated";
    // $sql = "SELECT * FROM cal_items WHERE caption LIKE '%bistro%' ORDER BY last_updated";

    $response = query($sql);

    $meh = [
        ['  ',' '],
        [',',' '],
        ['.',''],
        ['*',''],
        ['´',''],
        ['|',''],
        ['(',''],
        [')',''],
        ['-',''],
        ['/',' '],
        ['È','e'],
        ['É','e'],
        ['Ó','o'],
        ['ê','e'],
        ['  ',' '],

        ['rest ','restaurante '],
        ['resraurant','restaurante'],
        ['restaurant ','restaurante '],
        ['compelto','completo'],
        ['copmleto','completo'],

        ['fusionq','fusion'],
        ['fussion','fusion'],
        ['fuion','fusion'],
        ['bisrto','bistro'],
        ['bisro','bistro'],
        ['bistro fusion','bistro'],
        ['restaurante bistro','bistro'],

        ['restaurante dolce','dolce'],
        ['restaurante dolce mexico','dolce'],

        ['ciao mexico','ciao'],
        ['dolce mexico','dolce'],
        ['la cantina de dakota','dakota'],
        ['cantina de dakota','dakota'],
        ['cantina dakota','dakota'],

        ['cronwe','crowne'],
        ['cowne','crowne'],
        ['crwne','crowne'],
        ['crpwne','crowne'],
        ['crowne','crowne '],

        ['todos los salones cp con foyer','crowne con foyer'],
        ['floyer','foyer'],
        ['con su foyer','con foyer'],
        ['foyercito','foyer'],
        ['con foyer','foyer'],
        
        ['hokiday','holiday'],
        ['holday','holiday'],
        ['hoiliday','holiday'],
        ['holida ','holiday '],
        ['holi ','holiday '],
        ['holuday','holiday'],
        ['holioday','holiday'],
        ['holiday','holiday '],

        ['bel air','belair'],

        ['collection completo','collection 1 2 3'],
        
        ['espress','express'],
        ['expess','express'],
        ['exprees','express'],
        ['expres ','express '],
        ['express','express '],

        ['guadalajaara','guadalajara'],
        ['guadlajara','guadalajara'],
        ['guadaajara','guadalajara'],
        ['guadalaajara','guadalajara'],
        ['guadalajra','guadalajara'],
        ['guadalara','guadalajara'],
        ['guadaljara','guadalajara'],
        ['guajalajara','guadalajara'],
        ['guadajlajara','guadalajara'],
        ['guaadalajara','guadalajara'],
        ['gauadalajara','guadalajara'],
        ['gudalajara','guadalajara'],
        ['gualadajara','guadalajara'],
        ['gaudalajara','guadalajara'],
        ['guadalajar ','guadalajara '],
        ['guadalajara','guadalajara '],

        ['meexico','mexico'],
        ['meico','mexico'],
        ['mex ','mexico '],
        ['mexio','mexico'],
        ['mexico','mexico '],

        ['1y','1 y'],['y1','y 1'],
        ['2y','2 y'],['y2','y 2'],
        ['3y','3 y'],['y3','y 3'],
        ['4y','4 y'],['y4','y 4'],
        ['5y','5 y'],['y5','y 5'],

        [' y ',' '],

        ['  ',' '],

        ['guadalajara 4 foyer 5','guadalajara 4 5 foyer'],
        ['guadalajara 4 foyer 5','guadalajara 4 5 foyer'],
        ['guadalajara 4 foyer guadalajara 5','guadalajara 4 5 foyer'],
        ['guadalajara 5 foyer guadalajara 4','guadalajara 4 5 foyer'],
    ];

    $salones = [];
    $salones_pendientes = [];
    $salones_new = [];
    foreach($response as $element){
        $salon = $element['caption'];
        $salon = trim(strtolower($salon));
        foreach($meh as $change){
            $salon = str_replace($change[0],$change[1],$salon);
        }
        $salon = trim(strtolower($salon));
        if(!in_array($salon,$salones)){
            $salones[] = $salon;
        }
    }
    sort($salones);

    $traducido = [];
    foreach($salones as $element){
        $res = ["ciao","dolce","cuadro verde","dakota","desayunador","dolce","foyer","lobby bar","pecera"];
        if(in_array($element,$res)){
            $salones_new[]=$element;
            $traducido[$element][] = $element;
        }else if(str_contains($element,'belair')){
            $traducido[$element] = [];
            $aux = explode(' ',$element);
            foreach($aux as $i){
                if($i != 'belair'){
                    $salon_new = 'belair '.$i;
                    if(!in_array($salon_new,$traducido[$element])){
                        $traducido[$element][] = $salon_new;
                    }
                    if(!in_array($salon_new,$salones_new)){
                        $salones_new[] = $salon_new;
                    }
                }
            }
        }else if(str_contains($element,'collection')){
            $traducido[$element] = [];
            $aux = explode(' ',$element);
            foreach($aux as $i){
                if($i != 'collection'){
                    $salon_new = 'collection '.$i;
                    if(!in_array($salon_new,$traducido[$element])){
                        $traducido[$element][] = $salon_new;
                    }
                    if(!in_array($salon_new,$salones_new)){
                        $salones_new[] = $salon_new;
                    }
                }
            }
        }else if(str_contains($element,"crowne")){
            if(!str_contains($element,"guadalajara") && !str_contains($element,"mexico")){
                $traducido[$element] = [];
                $aux = explode(' ',$element);
                $completo = [];
                foreach($aux as $i){
                    if($i != 'crowne'){
                        $salon_new = 'crowne '.$i;
                        // echo $salon_new .'<br>';
                        if(!str_contains($salon_new,'completo') && !str_contains($salon_new,'foyer')){
                            if(!in_array($salon_new,$salones_new)){
                                $salones_new[] = $salon_new;
                            }
                        }
                        
                    }
                }
                // echo $element.'<br>';
            }
        }else if(str_contains($element,"express")){
            if(!str_contains($element,"holiday")){
                $traducido[$element] = [];
                $aux = explode(' ',$element);
                foreach($aux as $i){
                    echo $i.'<br>';
                    if($i != 'express'){
                        $salon_new = 'express '.$i;
                        // echo $salon_new .'<br>';
                        if(!in_array($salon_new,$salones_new)){
                            $salones_new[] = $salon_new;
                        }
                    }
                }
            }
        }else{
            $salones_pendientes[] = $element;
        }
    }

    // echo json_encode($salones, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES );
    // echo '<br><br>';
    // echo json_encode($salones_pendientes, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES );
    // echo '<br><br>';
    echo json_encode($salones_new, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES );
    // echo '<br><br>';
    // echo json_encode($traducido, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES );