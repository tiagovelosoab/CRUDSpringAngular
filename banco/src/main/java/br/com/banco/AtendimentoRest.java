package br.com.banco;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AtendimentoRest {
    @Autowired
    private AtendimentoRepository atendimentoRepository;

    @GetMapping("/atendimento")
    public ResponseEntity<List<Atendimento>> getAll() {
        return ResponseEntity.ok(atendimentoRepository.findAll());
    }

    @GetMapping("/atendimento/{id}")
    public ResponseEntity<Atendimento> getOne(@PathVariable("id") Integer id) {
        Atendimento retorno = atendimentoRepository.findById(id).get();
        if (retorno == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(retorno);
    }
    @PostMapping("/atendimento")
    public ResponseEntity<Atendimento> salvar(@RequestBody Atendimento atendimento){
        return ResponseEntity.ok(atendimentoRepository.save(atendimento));
    }

    @PutMapping("/atendimento")
    public ResponseEntity<Atendimento> atualizar(@RequestBody Atendimento atendimento){
        if(atendimento.getId()==null){
            return ResponseEntity.badRequest().build();
        }
        else if(atendimentoRepository.findById(atendimento.getId())==null){
            return ResponseEntity.badRequest().build();
        }
            return ResponseEntity.ok(atendimentoRepository.save(atendimento));
    }

    @DeleteMapping("/atendimento/{id}")
    public ResponseEntity<Atendimento> deletar(@PathVariable("id") Integer id){
        Atendimento retorno=atendimentoRepository.findById(id).get();
        if(retorno==null){
            return ResponseEntity.notFound().build();
        }
        atendimentoRepository.deleteById(id);
        return ResponseEntity.ok(retorno);
    }
}

