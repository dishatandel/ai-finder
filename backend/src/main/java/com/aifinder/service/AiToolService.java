package com.aifinder.service;

import com.aifinder.model.AiTool;
import com.aifinder.repository.AiToolRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AiToolService {

    private final AiToolRepository aiToolRepository;
    private static final Map<String, String> SYNONYM_MAP = new HashMap<>();

    static {
        SYNONYM_MAP.put("ppt", "presentation powerpoint slides slide generator deck");
        SYNONYM_MAP.put("humanizer", "ai humanizer humanize undetectable rewrite content text");
        SYNONYM_MAP.put("pdf", "pdf document query extract summarize chatpdf reader");
        SYNONYM_MAP.put("coding", "code programmer developer IDE completion copilot autocomplete");
        SYNONYM_MAP.put("meeting", "transcript summary notes call recorder zoom teams");
        SYNONYM_MAP.put("voice", "speech text to speech tts voiceover clone dubbing");
    }

    public AiToolService(AiToolRepository aiToolRepository) {
        this.aiToolRepository = aiToolRepository;
    }

    public List<AiTool> searchTools(String rawQuery) {
        if (rawQuery == null || rawQuery.trim().isEmpty()) {
            return aiToolRepository.findAll();
        }

        String cleanedQuery = rawQuery.trim().toLowerCase();
        
        StringBuilder expandedTerms = new StringBuilder();
        String[] tokens = cleanedQuery.split("\\s+");

        for (String token : tokens) {
            expandedTerms.append("+*").append(token).append("* ");
            if (SYNONYM_MAP.containsKey(token)) {
                for (String synonym : SYNONYM_MAP.get(token).split("\\s+")) {
                    expandedTerms.append("*").append(synonym).append("* ");
                }
            }
        }

        String fulltextSearchTerm = expandedTerms.toString().trim();
        return aiToolRepository.searchToolsByRelevance(fulltextSearchTerm, cleanedQuery);
    }
}