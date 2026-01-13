package com.minnaxd.dboat.repository;

import com.minnaxd.dboat.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    
}