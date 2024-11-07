package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.CaptchaAPI;

import java.util.HashMap;
import java.util.Map;

@RestController
public class CaptchaController implements CaptchaAPI {

    @Value("${google.recaptcha.key.secret}")
    private String secretKey;

    @Override
    public ResponseEntity<Map<String, Object>> verifyRecaptcha(Map<String, String> payload) {
        String token = payload.get("token");
        String url = "https://www.google.com/recaptcha/api/siteverify";
        RestTemplate restTemplate = new RestTemplate();


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);


        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("secret", secretKey);
        map.add("response", token);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);


        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);


        Map<String, Object> googleResponse = response.getBody();
        boolean success = (Boolean) googleResponse.get("success");


        if (success) {
            System.out.println("reCAPTCHA verificado con éxito: token válido.");
        } else {
            System.out.println("Falló la verificación de reCAPTCHA: token inválido.");
        }


        Map<String, Object> result = new HashMap<>();
        result.put("success", success);
        result.put("message", success ? "reCAPTCHA token is valid" : "reCAPTCHA token is invalid");

        return ResponseEntity.ok(result);
    }
}
