<?php
    function generate_jwt($h,$p,$s=SECRET_JWT) {
        $headers_encoded = base64url_encode(json_encode($h));
        $payload_encoded = base64url_encode(json_encode($p));
        $signature = hash_hmac('SHA256', "$headers_encoded.$payload_encoded", $s, true);
        $signature_encoded = base64url_encode($signature);
        $jwt = "$headers_encoded.$payload_encoded.$signature_encoded";
        return $jwt;
    }
    function valid_jwt($jwt,$secret=SECRET_JWT){
        try{
            $tokenParts = explode('.', $jwt);
            $header = base64_decode($tokenParts[0]);
            $payload = base64_decode($tokenParts[1]);
            $signature_provided = $tokenParts[2];

            $payload_data = json_decode($payload,1);
            $expiration = $payload_data['exp'];
            $is_token_expired = ($expiration - time()) < 0;
        
            $base64_url_header = base64url_encode($header);
            $base64_url_payload = base64url_encode($payload);
            $signature = hash_hmac('SHA256', $base64_url_header . "." . $base64_url_payload, $secret, true);
            $base64_url_signature = base64url_encode($signature);
        
            $is_signature_valid = ($base64_url_signature === $signature_provided);
            
            if($is_token_expired || !$is_signature_valid){
                return false;
            }else{
                return $payload_data;
            }
        }catch(Throwable $th){
            return false;
        }
    }
    function base64url_encode($str){
        return rtrim(strtr(base64_encode($str), '+/', '-_'), '=');
    }
?>