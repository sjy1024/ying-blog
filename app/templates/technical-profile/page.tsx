import type { Metadata, ResolvingMetadata } from "next";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ReliefMark } from "@/components/templates/relief-mark";
import { FieldNotesList } from "./_components/field-notes-list";
import { PROJECTS } from "./_data";
import styles from "./_components/field-manual.module.css";

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const inherited = await parent;
  return {
    title: "颖的手记 — 个人档案与博客",
    description: "颖的个人站点：嵌入式、前端与服务器运维的学习记录，项目展示与可筛选的手记文章。",
    openGraph: {
      ...inherited.openGraph,
      title: "颖的手记 — 个人档案与博客",
      description: "嵌入式、前端与服务器折腾的学习记录：项目档案与完整的手记文章。",
    },
    twitter: {
      ...inherited.twitter,
      title: "颖的手记 — 个人档案与博客",
      description: "颖的个人档案与手记：项目、学习笔记与服务器折腾记录。",
    },
  };
}

export default function TechnicalProfilePage() {
  return (
    <main className={styles.rail}>
      <section className={`${styles.hero} ${styles.ruleTop}`} aria-labelledby="profile-title">
        <div className={styles.heroCopy}>
          <p className={styles.figureLabel}>档案 / 2026</p>
          <h1 className={styles.heroTitle} id="profile-title">颖</h1>
          <p className={styles.heroStatement}>
            把想法做成能跑的东西，再把过程记下来。
          </p>
          <p className={styles.heroBody}>
            计算机专业学生，喜欢嵌入式、前端和服务器运维。正在做春联定制与售卖小程序毕设，
            也维护着自己的个人站点 orz.autos。
          </p>
          <dl className={styles.profileFacts}>
            <div><dt>身份</dt><dd>计算机专业学生</dd></div>
            <div><dt>正在做</dt><dd>春联商城毕设 · orz.autos 个人站</dd></div>
          </dl>
        </div>
        <div className={styles.heroMark}>
          <span className={styles.markCaption}>一枚会动的小字标</span>
          <ReliefMark label="颖的手记字标" />
        </div>
        <aside className={styles.marginNote} aria-label="边注">
          把有用的细节留在眼前。
          <span className={styles.marginUnderline} aria-hidden="true" />
        </aside>
      </section>

      <div className={styles.hatch} aria-hidden="true" />

      <section className={`${styles.section} ${styles.sectionRule}`} aria-labelledby="practice-title">
        <div className={styles.sectionHeading}>
          <p className={styles.figureLabel}>图 01 / 实践</p>
          <h2 className={styles.sectionTitle} id="practice-title">
            先想清楚要做的决定，再动手。
          </h2>
          <p className={styles.sectionIntro}>
            在课程、毕设和服务器之间来回切换，方法比工具更耐用。
            下面三条是在折腾里反复验证过的习惯。
          </p>
        </div>
        <div className={styles.practiceGrid}>
          <article className={styles.practiceItem}>
            <span className={styles.practiceIndex}>01</span>
            <h3>先实测，再下结论</h3>
            <p>本机通不等于外网通；判断之前先拿到证据，不靠打听，也不急着怀疑防火墙。</p>
          </article>
          <article className={styles.practiceItem}>
            <span className={styles.practiceIndex}>02</span>
            <h3>最小权限</h3>
            <p>日常用普通用户干活，只在装软件、改系统配置时才切 root；属主清晰，误伤面更小。</p>
          </article>
          <article className={styles.practiceItem}>
            <span className={styles.practiceIndex}>03</span>
            <h3>为小机器设计</h3>
            <p>2 核 2G 的机器上，零常驻进程、单份快照、原子替换；每个组件的开销都要算得清。</p>
          </article>
        </div>
      </section>

      <div className={styles.hatch} aria-hidden="true" />

      <section id="work" className={`${styles.section} ${styles.sectionRule}`} aria-labelledby="work-title">
        <div className={styles.sectionHeading}>
          <p className={styles.figureLabel}>图 02 / 项目</p>
          <h2 className={styles.sectionTitle} id="work-title">小系统，从头到尾想清楚。</h2>
          <p className={styles.sectionIntro}>
            记录做过和正在做的事：背景、选择与变化。
            点开一条项目，可以看完整的笔记。
          </p>
        </div>
        <div className={styles.projectList}>
          {PROJECTS.map((project) => (
            <details className={styles.projectRecord} key={project.number}>
              <summary className={styles.projectSummary}>
                <span className={styles.projectNumber}>{project.number}</span>
                <span className={styles.projectNameGroup}>
                  <h3 className={styles.projectName}>{project.title}</h3>
                  <span className={styles.projectField}>{project.field}</span>
                </span>
                <span className={styles.projectYear}>{project.year}</span>
                <span className={styles.disclosureIcon} aria-hidden="true" />
              </summary>
              <div className={styles.projectDetails}>
                <p className={styles.projectSummaryText}>{project.summary}</p>
                <div className={styles.projectDetailGrid}>
                  <div><h4>挑战</h4><p>{project.challenge}</p></div>
                  <div><h4>做法</h4><p>{project.approach}</p></div>
                  <div><h4>结果</h4><p>{project.result}</p></div>
                </div>
                <ul className={styles.toolList} aria-label={`${project.title} 用到的方法`}>
                  {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
                {project.repo ? (
                  <a className={styles.projectRepo} href={project.repo} target="_blank" rel="noopener noreferrer">
                    查看源码 <ArrowUpRight aria-hidden="true" size={12} />
                  </a>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className={styles.hatch} aria-hidden="true" />

      <section id="notes" className={`${styles.section} ${styles.sectionRule}`} aria-labelledby="notes-title">
        <div className={styles.notesHeading}>
          <div>
            <p className={styles.figureLabel}>图 03 / 手记</p>
            <h2 className={styles.sectionTitle} id="notes-title">折腾留下的手记。</h2>
          </div>
        </div>
        <p className={styles.sectionIntro}>
          关于学习、嵌入式与服务器运维的短记录，留下值得复用的细节。
        </p>
        <FieldNotesList />
      </section>

      <div className={styles.hatch} aria-hidden="true" />

      <section className={`${styles.contactSection} ${styles.sectionRule}`} aria-labelledby="contact-title">
        <div>
          <p className={styles.figureLabel}>图 04 / 联系</p>
          <h2 className={styles.contactTitle} id="contact-title">有想聊的问题？</h2>
          <p className={styles.contactCopy}>
            毕设、嵌入式、服务器折腾，或者只是打个招呼，都欢迎来信。
          </p>
        </div>
        <a className={styles.contactLink} href="mailto:kingjiaying@outlook.com?subject=%E6%9D%A5%E8%87%AA%E7%BD%91%E7%AB%99%E7%9A%84%E6%9C%8B%E5%8F%8B">
          写信给颖 <ArrowDownRight aria-hidden="true" size={16} />
        </a>
      </section>
    </main>
  );
}
