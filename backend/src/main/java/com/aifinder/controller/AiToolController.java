package com.aifinder.controller;

import com.aifinder.model.AiTool;
import com.aifinder.service.AiToolService;
import com.aifinder.repository.AiToolRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tools")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class AiToolController {

    private final AiToolService aiToolService;
    private final AiToolRepository aiToolRepository;

    public AiToolController(AiToolService aiToolService, AiToolRepository aiToolRepository) {
        this.aiToolService = aiToolService;
        this.aiToolRepository = aiToolRepository;
    }

    @GetMapping
    public List<AiTool> getAllTools() {
        return aiToolRepository.findAll();
    }

    @GetMapping("/search")
    public ResponseEntity<List<AiTool>> searchTools(@RequestParam(value = "query", required = false) String query) {
        List<AiTool> results = aiToolService.searchTools(query);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<AiTool>> getByCategory(@PathVariable String categoryName) {
        return ResponseEntity.ok(aiToolRepository.findByCategoryIgnoreCase(categoryName));
    }
}