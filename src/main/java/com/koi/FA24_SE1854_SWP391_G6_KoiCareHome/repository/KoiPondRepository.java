package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;


import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.KoiPond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KoiPondRepository extends JpaRepository<KoiPond, Long> {
    Optional<KoiPond> findExistingKoiPondById(Long id);
}
