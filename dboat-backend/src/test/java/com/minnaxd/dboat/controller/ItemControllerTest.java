package com.minnaxd.dboat.controller;

import com.minnaxd.dboat.model.Item;
import com.minnaxd.dboat.model.ItemType;
import com.minnaxd.dboat.repository.ItemRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ItemControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ItemRepository itemRepository;

    @Test
    public void postInvalidItem_shouldReturn400() throws Exception {
        String json = "{ \"title\": \"\", \"type\": null }";

        mockMvc.perform(post("/api/items")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Please provide a title for this item"))
                .andExpect(jsonPath("$.type").value("Please specify item type (e.g. GAME or BOOK)"));
    }

    @Test
    public void postValidItem_shouldReturn200() throws Exception {
        String json = "{ \"title\": \"Needful Things\", \"type\": \"BOOK\", \"author\": \"Stephen King\", \"completionDate\": \"2002-08-03\" }";

        mockMvc.perform(post("/api/items")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Needful Things"))
                .andExpect(jsonPath("$.type").value("BOOK"));
    }
}