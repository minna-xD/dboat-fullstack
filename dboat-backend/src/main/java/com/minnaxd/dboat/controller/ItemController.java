package com.minnaxd.dboat.controller;

import com.minnaxd.dboat.model.Item;
import com.minnaxd.dboat.repository.ItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin
public class ItemController {

    private final ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @PostMapping
    // public Item createItem(@RequestBody Item item) {
    //     return itemRepository.save(item);
    // }
    public ResponseEntity<Item> createItem(@Valid @RequestBody Item item) {
        Item savedItem = itemRepository.save(item);
        return ResponseEntity.ok(savedItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        return itemRepository.findById(id)
            .map(existingItem -> {
                existingItem.setTitle(updatedItem.getTitle());
                existingItem.setType(updatedItem.getType());
                existingItem.setCompletionDate(updatedItem.getCompletionDate());
                existingItem.setNotes(updatedItem.getNotes());
                existingItem.setAuthor(updatedItem.getAuthor());

                Item saved = itemRepository.save(existingItem);
                return ResponseEntity.ok(saved);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        if (!itemRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        itemRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}