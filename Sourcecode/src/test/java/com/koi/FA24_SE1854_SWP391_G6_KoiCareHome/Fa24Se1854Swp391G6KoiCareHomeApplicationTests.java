package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome;

//import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
//import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
//import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishRepository;
//import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.FishService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class Fa24Se1854Swp391G6KoiCareHomeApplicationTests {
//
//
//	@Mock
//	private FishRepository fishRepository;
//	@InjectMocks
//	private FishService fishService;
//
//	@BeforeEach
//	void setUp() {
//		MockitoAnnotations.openMocks(this);
//	}
//	private Fish createTestFish() {
//		Fish fish = new Fish();
//		fish.setFishID(1); // or any test ID
//		fish.setPondID(2); // Set the pond ID as needed
//		fish.setMemberID(2);
//		return fish;
//	}
//
//	@Test
//	void addFish() {
//		Fish fish = createTestFish();
//		Fish addedFish = fishService.saveFish(fish);
//		assertNotNull(addedFish);
//		assertEquals(1, addedFish.getFishID());
//		assertEquals(1, fishRepository.count());
//	}
//
//	@Test
//	void getFish() {
//		Fish fish = createTestFish();
//		fishRepository.save(fish);
//		Optional<Fish> foundFish = fishService.getFishById(1);
//		assertNotNull(foundFish);
//		if(foundFish.isPresent()) {
//			assertEquals(1, foundFish.get().getFishID());
//		}
//	}
//
//	@Test
//	void getFish_NotFound() {
//		assertThrows(NotFoundException.class, () -> fishService.getFishById(1));
//	}
//
//	@Test
//	void deleteFish() {
//		Fish fish = createTestFish();
//		fishRepository.save(fish);
//		fishService.deleteByID(1);
//		assertEquals(0, fishRepository.count());
//	}
//
//	@Test
//	void contextLoads() {
//	}
//
//}
