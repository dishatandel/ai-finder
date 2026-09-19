package com.aifinder.model;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(
    name = "ai_tools",
    indexes = {
        @Index(name = "idx_category", columnList = "category"),
        @Index(name = "idx_subcategory", columnList = "subcategory"),
        @Index(name = "idx_pricing", columnList = "pricing_type")
    }
)
public class AiTool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;
    private String subcategory;

    @Column(columnDefinition = "TEXT")
    private String tags;

    @Column(columnDefinition = "TEXT")
    private String keywords;

    @Column(columnDefinition = "TEXT", name = "use_cases")
    private String useCases;

    @Column(name = "pricing_type")
    private String pricingType;

    @Column(name = "website_url")
    private String websiteUrl;

    @Column(name = "logo_url")
    private String logoUrl;

    private Double rating = 4.5;

    @Column(name = "usage_count")
    private Integer usageCount = 0;

    public AiTool() {}

    public AiTool(String name, String description, String category, String subcategory,
                  String tags, String keywords, String useCases, String pricingType,
                  String websiteUrl, String logoUrl, Double rating, Integer usageCount) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.subcategory = subcategory;
        this.tags = tags;
        this.keywords = keywords;
        this.useCases = useCases;
        this.pricingType = pricingType;
        this.websiteUrl = websiteUrl;
        this.logoUrl = logoUrl;
        this.rating = rating != null ? rating : 4.5;
        this.usageCount = usageCount != null ? usageCount : 0;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubcategory() { return subcategory; }
    public void setSubcategory(String subcategory) { this.subcategory = subcategory; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public String getKeywords() { return keywords; }
    public void setKeywords(String keywords) { this.keywords = keywords; }

    public String getUseCases() { return useCases; }
    public void setUseCases(String useCases) { this.useCases = useCases; }

    public String getPricingType() { return pricingType; }
    public void setPricingType(String pricingType) { this.pricingType = pricingType; }

    public String getWebsiteUrl() { return websiteUrl; }
    public void setWebsiteUrl(String websiteUrl) { this.websiteUrl = websiteUrl; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getUsageCount() { return usageCount; }
    public void setUsageCount(Integer usageCount) { this.usageCount = usageCount; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AiTool aiTool = (AiTool) o;
        return Objects.equals(id, aiTool.id) || Objects.equals(name, aiTool.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}