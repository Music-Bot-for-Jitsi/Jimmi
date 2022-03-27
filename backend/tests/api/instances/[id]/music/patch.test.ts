import { superdeno } from "superdeno/mod.ts";
import app from "../../../../import.app.symlink.ts";
import { createJimmi } from "../../../../../src/service/Jimmi.service.ts";
import Jimmi from "../../../../../src/service/Jimmi.class.ts";
import { Actions } from "../../../../../src/api/instances/[id]/music/actions.ts";

Deno.test("PATCH /api/instances/unknown-id/music that it returns 404!", async () => {
  await superdeno(app)
    .patch("/api/instances/unknown-id/music")
    .expect("Content-Type", /text/)
    .expect(404);
});

Deno.test("PATCH /api/instances/known-id/music/ with action switchmusicurl that it returns 200 for a provided string url ", async () => {
  const testJimmi: Jimmi = createJimmi();
  const testUrl = "testurl.test";
  await superdeno(app)
    .patch("/api/instances/" + testJimmi.id + "/music")
    .send({ "status": Actions.PLAY, "current": testUrl })
    .expect("Content-Type", "application/json; charset=utf-8")
    //.expect({ "status": Actions.PLAY, "current": testUrl })
    .expect(200);
  await superdeno(app)
    .patch("/api/instances/" + testJimmi.id + "/music")
    .send({ "status": Actions.PAUSE, "current": 1 })
    .expect("Content-Type", /text/)
    .expect(400);
});

Deno.test("PATCH /api/instances/known-id/music/ that it returns 200 for actions PLAY, PAUSE and STOP and 400 for an unknown or missing ACTION", async () => {
  const testJimmi: Jimmi = createJimmi();
  await superdeno(app)
    .patch("/api/instances/" + testJimmi.id + "/music/")
    .send({ "status": Actions.PLAY })
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(200);
  await superdeno(app)
    .patch("/api/instances/" + testJimmi.id + "/music/")
    .send({ "status": Actions.PAUSE })
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(200);
  await superdeno(app)
    .patch("/api/instances/" + testJimmi.id + "/music/")
    .send({ "status": Actions.STOP })
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(200);
  await superdeno(app)
    .patch("/api/instances/" + testJimmi.id + "/music/")
    .send({ "status": "unknown" })
    .expect("Content-Type", /text/)
    .expect(400);
});
