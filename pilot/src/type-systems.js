// Representative roles measured from the assembled pages at 1440 × 1000.
// Samples are excerpts; measurements describe the page, not the library UI.
const role=(name,sample,family,font,size,line,weight,extra={})=>({name,sample,family,font,size,line,weight,...extra});
export const typeSystems={
 'editorial-01':{note:'The page uses substitute fonts. Sizes shown are from the assembled desktop adaptation.',roles:[
  role('Hero','Strong Form, Quiet Direction','Noto Serif Display','TypeEditorial',62.5,60,200,{stretch:'62.5%'}),
  role('Section heading','A few ways of looking.','Noto Serif Display','TypeEditorial',64.8,64.8,200,{stretch:'62.5%'}),
  role('Subheading','Observe','General Sans','TypeGeneral',16,26.4,400),
  role('Body','Work shaped by light, body language, and the space between gesture and pose.','General Sans','TypeGeneral',13,20,300),
  role('Label','01 / Selected observations','General Sans','TypeGeneral',12,20,400)
 ]},
 'blueprint-source':{roles:[
  role('Hero','The fastest way to make a generative design tool.','Geist','TypeBlueprint',76,74.48,500,{tracking:'-3.42px'}),
  role('Section heading','Made with Blueprint.','Geist','TypeBlueprint',44,46.2,500,{tracking:'-1.54px'}),
  role('Card heading','Send a link, not a file.','Geist','TypeBlueprint',15,'normal',500,{tracking:'-0.15px'}),
  role('Body','Halftone, dither and texture generators that work on the first try.','Geist','TypeBlueprint',18,27.9,400),
  role('Detail','20 free credits · No credit card','Geist','TypeBlueprint',13,'normal',400),
  role('Technical detail','tools.yourclient.com','Geist Mono','TypeBlueprintMono',10,'normal',400)
 ]},
 salesloft:{note:'The source fonts were unavailable; these are the substitutes used in the reconstruction.',roles:[
  role('Hero','Know which deals to close next.','Noto Serif Display','TypeSalesSerif',72,76.32,450,{tracking:'-3.24px'}),
  role('Section heading','Never start with an empty pipeline again','General Sans','TypeSalesSans',42,44.52,400,{tracking:'-1.47px'}),
  role('Card heading','Got it. Found 4 deals at risk.','General Sans','TypeSalesSans',20,28,500),
  role('Body',"Your reps waste hours guessing which deals matter.",'General Sans','TypeSalesSans',20,28,400),
  role('Detail','Runs weekdays - 7:00 AM','General Sans','TypeSalesSans',10.4,14.56,400)
 ]},
 interfere:{roles:[
  role('Hero','Ship software that never breaks','Inter','TypeInterfere',56,56,500,{tracking:'-0.56px'}),
  role('Section heading','Learn about issues before your customers do','Inter','TypeInterfere',28,36,500,{tracking:'-0.28px'}),
  role('Card heading','Broken password reset link','Inter','TypeInterfere',24,32,500,{tracking:'-0.24px'}),
  role('Body','Interfere empowers engineers, product managers and designers with real-time understanding.','Inter','TypeInterfere',15,24,400),
  role('Interface','Users are unable to complete password resets.','Inter','TypeInterfere',13,20,400),
  role('Quote','“Every hour spent chasing bugs is time away”','Heldane Text','TypeHeldane',28,36,400),
  role('Code','export function buildResetLink','Berkeley Mono','TypeBerkeley',12,16,400)
 ]},
 'steel-source':{roles:[
  role('Hero','Browser Infrastructure for AI Agents','ABC Schengen A','TypeSteel',60,60.6,400,{tracking:'-1.2px'}),
  role('Section heading','What people build on Steel','ABC Schengen A','TypeSteel',60,60.6,400,{tracking:'-1.2px'}),
  role('Metric','1,500,000+','ABC Schengen A','TypeSteel',40,40,400,{tracking:'-0.8px'}),
  role('Body','Steel is an API that lets you control fleets of browsers.','ABC Schengen A','TypeSteel',24,31.2,400,{tracking:'-0.48px'}),
  role('Navigation','BROWSER INFRA','ABC Schengen A Mono','TypeSteelMono',12,16,400),
  role('Code','$ curl -fsS https://setup.steel.dev | sh','ABC Schengen A Mono','TypeSteelMono',13,16,400)
 ]},
 conversion:{roles:[
  role('Hero','The agentic marketing automation platform','Family','TypeConversionSerif',64,67.2,400,{tracking:'-2.24px'}),
  role('Section heading','Trusted by marketing teams that move fast','Family','TypeConversionSerif',40,44,400,{tracking:'-1.4px'}),
  role('Card heading','Access Control & Compliance','TWK Lausanne','TypeConversionSans',18,24.3,500),
  role('Body','Built for MOps teams replacing Marketo, Pardot, and HubSpot.','TWK Lausanne','TypeConversionSans',18,27,400),
  role('Detail','Used by MOps teams replacing Marketo, Pardot, and HubSpot.','TWK Lausanne','TypeConversionSans',12,18,400)
 ]},
 plasticity:{roles:[
  role('Hero','Powerful solid and surface modeling, no subscription','FK Grotesk','TypePlasticity',60,60,400),
  role('Section heading','Why Plasticity','FK Grotesk','TypePlasticity',36,40,400),
  role('Feature heading','Boolean Precision','FK Grotesk','TypePlasticity',30,36,400),
  role('Body','A workflow optimized for creativity, unparalleled fillets, sophisticated surface modeling.','Matter','TypeMatter',14,20,400),
  role('Label','TRY IT FOR FREE FOR 30 DAYS','Aux Mono','TypeAux',12,16,400,{tracking:'-1.44px'})
 ]},
 mnh:{roles:[
  role('Hero','We partner with founders pushing the boundaries of technologies','TWK Lausanne','TypeMnh',48,48,400,{tracking:'-1.6px'}),
  role('Feature heading','CoreWeave','TWK Lausanne','TypeMnh',32,32,400,{tracking:'-1px'}),
  role('Section heading','Portfolio Highlights','TWK Lausanne','TypeMnh',24,24,400),
  role('Body','Millennium New Horizons is designed to back the next generation of entrepreneurs.','TWK Lausanne','TypeMnh',20,27,400),
  role('Detail','Invested in 2023','TWK Lausanne','TypeMnh',13,21.45,400)
 ]},
 conare:{note:'These roles come from the Conare homepage and evaluations page. A Geist Mono font file is retained, but its use was not observed in these samples.',roles:[
  role('Hero','Everything your agent needs to know.','Faculty Glyphic','TypeConareDisplay',48,52.8,400,{tracking:'-0.96px'}),
  role('Section heading','Connect the apps your team already uses.','Faculty Glyphic','TypeConareDisplay',32,38.4,400,{tracking:'-0.32px'}),
  role('Card heading','Connect','Faculty Glyphic','TypeConareDisplay',20,28,400),
  role('Hero body','Conare finds the right answer in any data you bring.','Geist','TypeConareGeist',16,24,400),
  role('Body','Spreadsheets, workbooks and PDFs, every row and cell, ready for your agents to search.','Geist','TypeConareGeist',15,24,400),
  role('Interface','Why did checkout break?','Geist','TypeConareGeist',12,16,400),
  role('Action','Read docs','Geist','TypeConareGeist',12,18,500),
  role('Eyebrow','SEARCH ACROSS 100M+ DOCUMENTS','Geist','TypeConareGeist',10,14,500,{tracking:'0.6px'}),
  role('Evaluation metric','67.0','Inter','TypeConareInter',36,41.4,400),
  role('Evaluation detail','Every benchmark, losses included.','Inter','TypeConareInter',14,21,400)
 ]}
};
