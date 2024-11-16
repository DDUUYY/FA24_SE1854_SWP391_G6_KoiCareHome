package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Pond;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.PondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<Pond> getAllPonds() {
        return pondRepository.findAll();
    }

    public Pond getPondById(Integer id) {
        return pondRepository.findById(id).orElse(null);
    }

    public Pond createPond(Pond pond) {
        return pondRepository.save(pond);
    }

    public Pond updatePond(Integer id, Pond pondDetails) {
        Optional<Pond> optionalPond = pondRepository.findById(id);
        if (optionalPond.isPresent()) {
            Pond pond = optionalPond.get();
            pond.setDepth(pondDetails.getDepth());
            pond.setVolume(pondDetails.getVolume());
            pond.setDrainageCount(pondDetails.getDrainageCount());
            pond.setEquipment(pondDetails.getEquipment());
            pond.setIsActive(pondDetails.getIsActive());
            return pondRepository.save(pond);
        }
        return null;
    }

    public void deletePond(Integer id) {
        pondRepository.deleteById(id);
    }
}