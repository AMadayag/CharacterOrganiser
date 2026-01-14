package characterOrg.controller;

import characterOrg.model.request.EntityRequest;
import characterOrg.model.request.PositionRequest;
import characterOrg.model.request.RelationshipRequest;
import characterOrg.model.util.Position;
import characterOrg.model.worlds.Entity;
import characterOrg.model.worlds.Relative;
import characterOrg.model.worlds.World;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/world")
public class Controller {
    
    private World world = new World();

    @GetMapping
    public World getWorld() {
        return world;
    }

    @PostMapping("/entity")
    public Entity addEntity(@RequestBody EntityRequest e) {
        return world.addEntity(
            e.getPosition(), e.getName(), e.getType());
    }

    @PutMapping("/entity/{id}/style")
    public void updateEntityStyle(@PathVariable int id, @RequestBody Map<String, String> body) {
        String style = body.get("style");
        world.getEntityFromId(id).setStyle(style);
    }

    @PutMapping("/entity/{id}/position")
    public void updateEntityPosition(@PathVariable int id, @RequestBody PositionRequest p) {
        Position pos = new Position(p.getX(), p.getY());
        world.getEntityFromId(id).updatePosition(pos);
    }

    @PutMapping("/entity/{id}/name")
    public void updateEntityName(@PathVariable int id, @RequestBody EntityRequest e) {
        world.getEntityFromId(id).setName(e.getName());
    }

    @GetMapping("entity/{id}/notes")
    public String getNotes(@PathVariable int id) {
        return world.getEntityFromId(id).getNotes();
    }

    @PutMapping("/entity/{id}/notes")
    public void updateEntityNotes(@PathVariable int id, @RequestBody EntityRequest e) {
        world.getEntityFromId(id).updateNotes(e.getNotes());;
    }

    @GetMapping("entity/{id}/relatives")
    public List<Relative> getRelatives(@PathVariable int id) {
        return world.getEntityFromId(id).getRelatives();
    }

    @PutMapping("/entity/{id}/relative/{relativeId}/info")
    public void updateRelativeInfo(
        @PathVariable int id,
        @PathVariable int relativeId,
        @RequestBody Map<String, String> body
    ) {
        Entity entity = world.getEntityFromId(id);
        String info = body.get("info");
        
        Relative r = entity.getRelativeFromId(relativeId);
        r.updateInfo(info);
    }

    @PutMapping("/relationships")
    public void addRelationship(@RequestBody RelationshipRequest r) {
        world.addRelationship(world.getEntityFromId(r.getId1()),world. getEntityFromId(r.getId2()));
    }

    @DeleteMapping("/relationships")
    public void removeRelationship(@RequestBody RelationshipRequest r) {
        world.removeRelationship(world.getRelationshipFromId(r.getRId()));
    }

    @PutMapping("/relationships/{id}/info")
    public void updateRelationshipInfo(@PathVariable int id, @RequestBody RelationshipRequest r) {
        world.getRelationshipFromId(id).updateInfo(r.getInfo());
    }
}
