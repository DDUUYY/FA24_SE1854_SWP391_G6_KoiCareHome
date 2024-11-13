package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Pond;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.PondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PondService {
    private final PondRepository pondRepository;

    @Autowired
    public PondService(PondRepository pondRepository) {
        this.pondRepository = pondRepository;
    }

    public List<Pond> getAllPondWithMemberId(int memberId) {
        return pondRepository.findAllPondWithMemberId(memberId);
    }
}
