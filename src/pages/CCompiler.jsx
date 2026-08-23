import ProjectPage from "../components/ProjectPage.jsx";
import TechTags from "../components/TechTags.jsx";

export default function CCompiler() {
  return (
    <ProjectPage>
      <h1>C Compiler Front End</h1>
      <p>
        A compiler construction course project: a lexer and parser for a small C-like language
        that performs semantic analysis (type checking, symbol tables, initialization tracking)
        while it parses, and emits ILOC-style three-address intermediate code organized into
        labeled basic blocks &mdash; the same target IR used throughout Cooper &amp; Torczon's{" "}
        <em>Engineering a Compiler</em>.
      </p>

      <TechTags tags={["C", "Flex (win_flex)", "Bison (win_bison)", "ILOC IR", "Makefile"]} />

      <h2>Approach</h2>
      <p>
        The scanner (<code>scanner.l</code>) tokenizes a C subset &mdash; five numeric types,{" "}
        <code>if</code>/<code>else</code>, <code>for</code>, <code>return</code>, arithmetic and
        comparison operators, and identifiers/literals. The grammar (<code>parser.y</code>) covers
        function definitions with parameters, declarations (with or without initializer),
        assignment, <code>if</code>/<code>if</code>-<code>else</code>, C-style <code>for</code>{" "}
        loops, and <code>return</code>. Every reduction carries an <code>ExprVal</code> (type,
        allocated register, and whether that register is freshly computed or just borrowed from a
        variable) up through the grammar, so code generation happens directly in the parser
        actions &mdash; no separate AST pass.
      </p>
      <p>
        While parsing, each declaration and reference is checked against a symbol table:
        redeclaration, use-before-declaration, use-before-initialization, and type mismatches in
        assignments and binary expressions are all caught and reported, and a failed check flips a
        global error flag that suppresses the final <code>success</code>.
      </p>

      <div className="code-sample">
        <figure>
          <figcaption>input.c</figcaption>
          <pre className="code-block">
            <code>{`int sum(int start, int end)
{
    int result = 0;
    for(int i = start; i < end; i++)
    {
        result = result + i;
    }
    return result;
}`}</code>
          </pre>
        </figure>
        <figure>
          <figcaption>generated IR</figcaption>
          <pre className="code-block">
            <code>{`<BB0>
loadI 4, r2
loadAO rarp, r2, r3
loadI 8, r4
loadAO rarp, r4, r5
loadI 0, r6
i2i r3, r7
jumpI L1
<BB1>
L1:
cmp_LT r7, r5, r8
cbr r8, L0, L2
<BB2>
L0:
add r6, r7, r9
loadI 1, r10
add r7, r10, r11
jumpI L1
<BB3>
L2:
i2i r9, r1
jump r0`}</code>
          </pre>
        </figure>
      </div>
      <p>
        Parameters are loaded off the activation record pointer (<code>rarp</code>) at function
        entry, the loop condition and body each get their own basic block so branch targets always
        land on a block boundary, and the return value is copied into the reserved{" "}
        <code>r1</code> before jumping back through <code>r0</code>, the return address register.
      </p>

      <h2>Design decisions</h2>
      <ul>
        <li>
          <strong>Fresh vs. borrowed registers.</strong> Every expression result tracks whether its
          register was just computed (<code>fresh</code>) or is an alias for an existing
          variable's register. Assigning a borrowed value emits an explicit <code>i2i</code> copy
          so two variables never silently end up sharing one register; assigning a fresh value
          just renames it, avoiding a redundant copy.
        </li>
        <li>
          <strong>Basic blocks as the unit of emission.</strong> Rather than emitting one flat
          instruction stream, every branch target (<code>if</code>/<code>else</code> arms, loop
          condition, loop body, loop exit) starts a new labeled block, so the output is already in
          the block-and-label form a later optimization or codegen pass would expect.
        </li>
        <li>
          <strong>Single-pass, no AST.</strong> Because IR is emitted directly from Bison's
          reduction actions, there's no intermediate tree to build or walk &mdash; simpler for a
          language this small, at the cost of needing every rule to thread its state (labels,
          nesting depth, loop update info) through global stacks like <code>if_nest</code> and{" "}
          <code>for_nest</code> instead of a tree structure.
        </li>
      </ul>

      <h2>Semantic error checking</h2>
      <p>
        Type errors and scope errors are reported as diagnostics but don't stop the parse &mdash;
        the compiler keeps going so it can surface every issue in one pass, then prints{" "}
        <code>fail</code> instead of the IR dump once parsing finishes if anything went wrong:
      </p>
      <div className="code-sample">
        <figure>
          <figcaption>type mismatch</figcaption>
          <pre className="code-block">
            <code>{`long a;
float b = 1.2;
a = b;`}</code>
          </pre>
          <pre className="code-block">
            <code>{`[ERROR] Type mismatch: cannot
assign float to long 'a'.`}</code>
          </pre>
        </figure>
        <figure>
          <figcaption>use before initialization</figcaption>
          <pre className="code-block">
            <code>{`int a;
int b = a;`}</code>
          </pre>
          <pre className="code-block">
            <code>{`[ERROR] 'a' used
uninitialized.`}</code>
          </pre>
        </figure>
      </div>

      <h2>Limitations</h2>
      <ul>
        <li>
          Front end only &mdash; functions are parsed and their own IR is emitted, but there's no{" "}
          <code>call</code> instruction, so nothing in the language actually invokes another
          function.
        </li>
        <li>
          No arrays, pointers, or strings; only <code>char</code>/<code>short</code>/<code>int</code>
          /<code>long</code>/<code>float</code> scalars.
        </li>
        <li>
          <code>for</code> loops only support a single <code>ID++</code>/<code>ID--</code> update
          clause, matching the grammar's fixed <code>for_update_part</code> rule.
        </li>
        <li>
          Symbol table, basic block count, and nesting depth are all fixed-size global arrays (
          <code>MAX_SYMBOLS</code>, <code>MAX_BLOCKS</code>, <code>MAX_NESTING</code>), sized for
          course-scale test inputs rather than arbitrary programs.
        </li>
      </ul>

      <h2>Build &amp; run</h2>
      <p>
        Built with <code>win_flex</code>/<code>win_bison</code> and GCC via the included Makefile (
        <code>mingw32-make</code>); the resulting <code>myparser</code> reads a source file from
        stdin and prints its IR (or <code>fail</code> with diagnostics) to stdout.
      </p>
    </ProjectPage>
  );
}
