package com.aifinder.dto;

import java.time.LocalDate;
import java.util.List;

public class AiToolDto {
    private Long id;
    private String name;
    private String description;
    private String features;
    private String pricingType;
    private String pricingDetails;
    private String bestFor;
    private String limitations;
    private String websiteUrl;
    private LocalDate lastVerified;
    private Double rating;
    private Long usageCount;
    private List<String> tasks;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }

    public String getPricingType() { return pricingType; }
    public void setPricingType(String pricingType) { this.pricingType = pricingType; }

    public String getPricingDetails() { return pricingDetails; }
    public void setPricingDetails(String pricingDetails) { this.pricingDetails = pricingDetails; }

    public String getBestFor() { return bestFor; }
    public void setBestFor(String bestFor) { this.bestFor = bestFor; }

    public String getLimitations() { return limitations; }
    public void setLimitations(String limitations) { this.limitations = limitations; }

    public String getWebsiteUrl() { return websiteUrl; }
    public void setWebsiteUrl(String websiteUrl) { this.websiteUrl = websiteUrl; }

    public LocalDate getLastVerified() { return lastVerified; }
    public void setLastVerified(LocalDate lastVerified) { this.lastVerified = lastVerified; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Long getUsageCount() { return usageCount; }
    public void setUsageCount(Long usageCount) { this.usageCount = usageCount; }

    public List<String> getTasks() { return tasks; }
    public void setTasks(List<String> tasks) { this.tasks = tasks; }
}