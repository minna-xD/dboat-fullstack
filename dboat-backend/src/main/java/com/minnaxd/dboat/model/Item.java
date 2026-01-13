package com.minnaxd.dboat.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "items")

public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@NotNull
    @Column(nullable = false)
    private String title;

    //@NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemType type;

    private LocalDate completionDate;

    private String notes;

    private String author;

    public Item() {
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public ItemType getType() {
        return type;
    }
    public void setType(ItemType type) {
        this.type = type;
    }

    public LocalDate getCompletionDate() {
        return completionDate;
    }
    public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
    }

    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
}