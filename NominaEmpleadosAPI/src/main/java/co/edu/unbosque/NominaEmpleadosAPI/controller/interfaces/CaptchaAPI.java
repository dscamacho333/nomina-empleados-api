package co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;


@RequestMapping("/api/recaptcha")
public interface CaptchaAPI {

    @PostMapping("/verify")
    ResponseEntity<Map<String, Object>> verifyRecaptcha(@RequestBody Map<String, String> payload);
}