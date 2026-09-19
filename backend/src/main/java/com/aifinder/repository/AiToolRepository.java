package com.aifinder.repository;

import com.aifinder.model.AiTool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AiToolRepository extends JpaRepository<AiTool, Long> {

    @Query(value = """
        SELECT *, 
               (
                 (MATCH(name) AGAINST(:searchTerm IN BOOLEAN MODE) * 4.0) +
                 (MATCH(keywords) AGAINST(:searchTerm IN BOOLEAN MODE) * 3.5) +
                 (MATCH(tags) AGAINST(:searchTerm IN BOOLEAN MODE) * 3.0) +
                 (MATCH(use_cases) AGAINST(:searchTerm IN BOOLEAN MODE) * 2.5) +
                 (MATCH(category, subcategory) AGAINST(:searchTerm IN BOOLEAN MODE) * 2.0) +
                 (MATCH(description) AGAINST(:searchTerm IN BOOLEAN MODE) * 1.0)
               ) AS relevance_score
        FROM ai_tools
        WHERE MATCH(name, description, category, subcategory, tags, keywords, use_cases) 
              AGAINST(:searchTerm IN BOOLEAN MODE)
           OR LOWER(name) LIKE LOWER(CONCAT('%', :rawQuery, '%'))
           OR LOWER(keywords) LIKE LOWER(CONCAT('%', :rawQuery, '%'))
           OR LOWER(tags) LIKE LOWER(CONCAT('%', :rawQuery, '%'))
           OR LOWER(use_cases) LIKE LOWER(CONCAT('%', :rawQuery, '%'))
        ORDER BY relevance_score DESC, rating DESC, usage_count DESC
        """, nativeQuery = true)
    List<AiTool> searchToolsByRelevance(@Param("searchTerm") String searchTerm, @Param("rawQuery") String rawQuery);

    List<AiTool> findByCategoryIgnoreCase(String category);
}