import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const packageRoot = join(import.meta.dirname, "..");

// Resolve the Biome binary via Node module resolution starting from the
// package root. This works both as a standalone package (biome in local
// node_modules) and inside a monorepo (biome hoisted to the workspace root).
const require = createRequire(import.meta.url);
const biomeBin = require.resolve("@biomejs/biome/bin/biome");
const testConfig = join(import.meta.dirname, "biome.config.jsonc");
const fixturesDir = join(import.meta.dirname, "fixtures");

interface PluginDiagnostic {
  category: string;
  message: string;
}

function lintFixture(relativePath: string): PluginDiagnostic[] {
  const fixture = join(fixturesDir, relativePath);

  const result = spawnSync(
    biomeBin,
    ["lint", `--config-path=${testConfig}`, "--reporter=json", fixture],
    { encoding: "utf-8" }
  );

  // The rules run at `error` severity, so `biome lint` exits non-zero when a
  // fixture violates a rule. That is expected for positive fixtures — the
  // diagnostics are parsed from the JSON report below. A crash (no report)
  // surfaces as a JSON parse error instead.
  if (result.status !== 0 && !result.stdout.includes('"diagnostics"')) {
    throw new Error(`biome failed on ${relativePath}:\n${result.stderr}`);
  }

  // Strip the "experimental reporter" notice biome prints to stdout.
  const stdout = result.stdout
    .split("\n")
    .filter(
      (line) =>
        !line.startsWith(
          "The `json` and `json-pretty` reporters are experimental"
        )
    )
    .join("\n");

  const report: { diagnostics: PluginDiagnostic[] } = JSON.parse(stdout);
  return report.diagnostics.filter(
    (diagnostic) => diagnostic.category === "plugin"
  );
}

function messagesFor(relativePath: string): string[] {
  return lintFixture(relativePath).map((diagnostic) => diagnostic.message);
}

const SELECT_MESSAGE = "Payload queries should specify `select`";
const DEPTH_MESSAGE = "Payload queries should set `depth` explicitly. Omitting it uses the application default";
const OVERRIDE_ACCESS_MESSAGE = "Always declare `overrideAccess` explicitly";
const POPULATE_MESSAGE =
  "Payload queries with `depth` greater than 0 should specify `populate`";
const USER_MESSAGE = "When `overrideAccess: false` is set, pass `user`";

describe("no-find-without-select", () => {
  it("flags payload.find without select", () => {
    const messages = messagesFor("select/01-missing-select.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(SELECT_MESSAGE);
  });

  it("accepts find/findByID with select", () => {
    expect(messagesFor("select/02-with-select.ts")).toHaveLength(0);
  });

  it("accepts an empty select object", () => {
    expect(messagesFor("select/03-empty-select.ts")).toHaveLength(0);
  });

  it("flags this.payload.find without select", () => {
    const messages = messagesFor("select/04-this-payload.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(SELECT_MESSAGE);
  });

  it("skips calls with spread arguments", () => {
    expect(messagesFor("select/05-spread-args.ts")).toHaveLength(0);
  });

  it("skips calls with non-object arguments", () => {
    expect(messagesFor("select/06-non-object-args.ts")).toHaveLength(0);
  });

  it("does not flag array .find calls on a variable named payload", () => {
    expect(messagesFor("select/07-array-find.ts")).toHaveLength(0);
  });

  it("does not flag payload.db direct database calls", () => {
    expect(messagesFor("select/08-payload-db.ts")).toHaveLength(0);
  });

  it("does not flag count, and accepts findGlobal when select is provided", () => {
    expect(messagesFor("select/09-other-ops.ts")).toHaveLength(0);
  });

  it("accepts select passed as a shorthand property", () => {
    expect(messagesFor("select/10-shorthand-select.ts")).toHaveLength(0);
  });

  it("flags payload.findGlobal without select", () => {
    const messages = messagesFor("select/11-find-global-without-select.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(SELECT_MESSAGE);
  });

  it("flags payload.findVersions and findVersionByID without select", () => {
    const messages = messagesFor("select/12-find-versions-without-select.ts");
    expect(messages).toHaveLength(2);
    for (const msg of messages) {
      expect(msg).toContain(SELECT_MESSAGE);
    }
  });

  it("accepts findVersions and findVersionByID with select", () => {
    expect(messagesFor("select/13-find-versions-with-select.ts")).toHaveLength(0);
  });
});

describe("no-find-without-depth", () => {
  it("flags payload.find without depth", () => {
    const messages = messagesFor("depth/01-missing-depth.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(DEPTH_MESSAGE);
  });

  it("accepts find/findByID with depth", () => {
    expect(messagesFor("depth/02-with-depth.ts")).toHaveLength(0);
  });

  it("flags req.payload.findByID without depth", () => {
    const messages = messagesFor("depth/03-req-find-by-id-no-depth.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(DEPTH_MESSAGE);
  });

  it("skips calls with spread arguments", () => {
    expect(messagesFor("depth/04-spread-args.ts")).toHaveLength(0);
  });

  it("skips calls with non-object arguments", () => {
    expect(messagesFor("depth/05-non-object-args.ts")).toHaveLength(0);
  });

  it("accepts depth passed as a shorthand property", () => {
    expect(messagesFor("depth/06-shorthand-depth.ts")).toHaveLength(0);
  });

  it("flags payload.findGlobal without depth", () => {
    const messages = messagesFor("depth/07-find-global-without-depth.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(DEPTH_MESSAGE);
  });

  it("flags payload.findVersions and findVersionByID without depth", () => {
    const messages = messagesFor("depth/08-find-versions-without-depth.ts");
    expect(messages).toHaveLength(2);
    for (const msg of messages) {
      expect(msg).toContain(DEPTH_MESSAGE);
    }
  });
});

describe("prefer-explicit-populate", () => {
  it("flags depth greater than 0 without populate", () => {
    const messages = messagesFor("populate/01-depth-without-populate.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(POPULATE_MESSAGE);
  });

  it("accepts depth with populate", () => {
    expect(messagesFor("populate/02-with-populate.ts")).toHaveLength(0);
  });

  it("accepts depth 0 without populate", () => {
    expect(messagesFor("populate/03-depth-zero.ts")).toHaveLength(0);
  });

  it("skips computed depth values", () => {
    expect(messagesFor("populate/04-computed-depth.ts")).toHaveLength(0);
  });

  it("flags findGlobal with depth greater than 0 without populate", () => {
    const messages = messagesFor("populate/05-find-global-without-populate.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(POPULATE_MESSAGE);
  });

  it("skips calls with spread arguments", () => {
    expect(messagesFor("populate/06-spread-args.ts")).toHaveLength(0);
  });

  it("flags payload.findVersions with depth greater than 0 without populate", () => {
    const messages = messagesFor("populate/07-find-versions-without-populate.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(POPULATE_MESSAGE);
  });
});

describe("no-missing-override-access", () => {
  it("flags payload.find without overrideAccess", () => {
    const messages = messagesFor("override-access/01-missing-override.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(OVERRIDE_ACCESS_MESSAGE);
  });

  it("accepts explicit overrideAccess (true or false)", () => {
    expect(messagesFor("override-access/02-with-override.ts")).toHaveLength(0);
  });

  it("flags payload.count without overrideAccess", () => {
    const messages = messagesFor("override-access/03-count-no-override.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(OVERRIDE_ACCESS_MESSAGE);
  });

  it("flags payload.login without overrideAccess", () => {
    const messages = messagesFor("override-access/04-login-no-override.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(OVERRIDE_ACCESS_MESSAGE);
  });

  it("flags payload.findGlobal without overrideAccess", () => {
    const messages = messagesFor(
      "override-access/05-find-global-no-override.ts"
    );
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(OVERRIDE_ACCESS_MESSAGE);
  });

  it("flags payload.updateGlobal without overrideAccess", () => {
    const messages = messagesFor(
      "override-access/06-update-global-no-override.ts"
    );
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(OVERRIDE_ACCESS_MESSAGE);
  });

  it("flags payload.updateByID without overrideAccess", () => {
    const messages = messagesFor(
      "override-access/07-update-by-id-no-override.ts"
    );
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(OVERRIDE_ACCESS_MESSAGE);
  });

  it("flags req.payload.deleteByID without overrideAccess", () => {
    const messages = messagesFor(
      "override-access/08-delete-by-id-no-override.ts"
    );
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(OVERRIDE_ACCESS_MESSAGE);
  });

  it("skips calls with spread arguments", () => {
    expect(messagesFor("override-access/09-spread-args.ts")).toHaveLength(0);
  });

  it("skips calls with non-object arguments", () => {
    expect(messagesFor("override-access/10-non-object-args.ts")).toHaveLength(
      0
    );
  });

  it("does not flag array .find calls on a variable named payload", () => {
    expect(messagesFor("override-access/11-array-find.ts")).toHaveLength(0);
  });

  it("does not flag payload.db direct database calls", () => {
    expect(messagesFor("override-access/12-payload-db.ts")).toHaveLength(0);
  });

  it("accepts overrideAccess passed as a shorthand property", () => {
    expect(
      messagesFor("override-access/13-shorthand-override.ts")
    ).toHaveLength(0);
  });

  it("flags payload.unlock without overrideAccess", () => {
    const messages = messagesFor(
      "override-access/14-unlock-no-override.ts"
    );
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(OVERRIDE_ACCESS_MESSAGE);
  });

  it("flags payload.findVersions and findVersionByID without overrideAccess", () => {
    const messages = messagesFor(
      "override-access/15-find-versions-no-override.ts"
    );
    expect(messages).toHaveLength(2);
    for (const msg of messages) {
      expect(msg).toContain(OVERRIDE_ACCESS_MESSAGE);
    }
  });
});

describe("require-user-with-override-false", () => {
  it("flags overrideAccess: false without user", () => {
    const messages = messagesFor("user/01-override-false-no-user.ts");
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain(USER_MESSAGE);
  });

  it("accepts overrideAccess: false with user", () => {
    expect(messagesFor("user/02-override-false-with-user.ts")).toHaveLength(0);
  });

  it("does not flag overrideAccess: true without user", () => {
    expect(messagesFor("user/03-override-true-no-user.ts")).toHaveLength(0);
  });

  it("flags multiple ops with overrideAccess: false and no user", () => {
    const messages = messagesFor("user/04-multiple-ops-no-user.ts");
    expect(messages).toHaveLength(2);
    for (const msg of messages) {
      expect(msg).toContain(USER_MESSAGE);
    }
  });

  it("accepts user passed as a shorthand property", () => {
    expect(messagesFor("user/05-shorthand-user.ts")).toHaveLength(0);
  });

  it("skips calls with spread arguments", () => {
    expect(messagesFor("user/06-spread-args.ts")).toHaveLength(0);
  });
});
