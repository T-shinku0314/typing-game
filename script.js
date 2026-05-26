// ================================
// Data
// ================================
// 難易度はローマ字の文字数で分類: easy≤11, normal 12-17, hard 18+
// Rookie(1-3): easy語, Fighter(4-6): normal語, Veteran(7-9): hard語
// Elite(10-12) / Legend(13-15) は暫定でhard語を流用。お題を指定して追加可能。
const WORD_LISTS = {
  1: [
    { ja: '猫',  ro: 'neko',  ruby: '<ruby>猫<rt>ねこ</rt></ruby>' },
    { ja: '犬',  ro: 'inu',   ruby: '<ruby>犬<rt>いぬ</rt></ruby>' },
    { ja: '空',  ro: 'sora',  ruby: '<ruby>空<rt>そら</rt></ruby>' },
    { ja: '海',  ro: 'umi',   ruby: '<ruby>海<rt>うみ</rt></ruby>' },
    { ja: '山',  ro: 'yama',  ruby: '<ruby>山<rt>やま</rt></ruby>' },
    { ja: '花',  ro: 'hana',  ruby: '<ruby>花<rt>はな</rt></ruby>' },
    { ja: '雨',  ro: 'ame',   ruby: '<ruby>雨<rt>あめ</rt></ruby>' },
    { ja: '風',  ro: 'kaze',  ruby: '<ruby>風<rt>かぜ</rt></ruby>' },
    { ja: '星',  ro: 'hosi',  ruby: '<ruby>星<rt>ほし</rt></ruby>' },
    { ja: '雲',  ro: 'kumo',  ruby: '<ruby>雲<rt>くも</rt></ruby>' },
  ],
  2: [
    { ja: '桜',   ro: 'sakura',  ruby: '<ruby>桜<rt>さくら</rt></ruby>' },
    { ja: 'みかん', ro: 'mikann',   ruby: 'みかん' },
    { ja: '車',   ro: 'kuruma',  ruby: '<ruby>車<rt>くるま</rt></ruby>' },
    { ja: '電話', ro: 'denwa',   ruby: '<ruby>電話<rt>でんわ</rt></ruby>' },
    { ja: '時計', ro: 'tokei',   ruby: '<ruby>時計<rt>とけい</rt></ruby>' },
    { ja: 'かばん', ro: 'kabann',   ruby: 'かばん' },
    { ja: '鉛筆', ro: 'enpitu',  ruby: '<ruby>鉛筆<rt>えんぴつ</rt></ruby>' },
    { ja: '飛行機', ro: 'hikouki', ruby: '<ruby>飛行機<rt>ひこうき</rt></ruby>' },
    { ja: '信号', ro: 'singou',  ruby: '<ruby>信号<rt>しんごう</rt></ruby>' },
    { ja: '窓辺', ro: 'madobe',  ruby: '<ruby>窓辺<rt>まどべ</rt></ruby>' },
  ],
  3: [
    { ja: '友達',   ro: 'tomodati',   ruby: '<ruby>友達<rt>ともだち</rt></ruby>' },
    { ja: '朝ごはん', ro: 'asagohann',   ruby: '<ruby>朝<rt>あさ</rt></ruby>ごはん' },
    { ja: '夏休み', ro: 'natuyasumi', ruby: '<ruby>夏休<rt>なつやす</rt></ruby>み' },
    { ja: '宝物',   ro: 'takaramono', ruby: '<ruby>宝物<rt>たからもの</rt></ruby>' },
    { ja: '自転車', ro: 'zitensya',   ruby: '<ruby>自転車<rt>じてんしゃ</rt></ruby>' },
    { ja: '動物園', ro: 'doubutuenn',  ruby: '<ruby>動物園<rt>どうぶつえん</rt></ruby>' },
    { ja: '音楽室', ro: 'ongakusitu', ruby: '<ruby>音楽室<rt>おんがくしつ</rt></ruby>' },
    { ja: '水曜日', ro: 'suiyoubi',   ruby: '<ruby>水曜日<rt>すいようび</rt></ruby>' },
    { ja: '夕焼け空', ro: 'yuuyakesora', ruby: '<ruby>夕焼<rt>ゆうや</rt></ruby>け<ruby>空<rt>そら</rt></ruby>' },
    { ja: '魔法使い', ro: 'mahoutukai', ruby: '<ruby>魔法使<rt>まほうつか</rt></ruby>い' },
  ],
  4: [
    { ja: '今日の天気',       ro: 'kyounotenki',        ruby: '<ruby>今日<rt>きょう</rt></ruby>の<ruby>天気<rt>てんき</rt></ruby>' },
    { ja: '早く打つ',         ro: 'hayakuutu',           ruby: '<ruby>早<rt>はや</rt></ruby>く<ruby>打<rt>う</rt></ruby>つ' },
    { ja: '毎日練習',         ro: 'mainitirensyuu',      ruby: '<ruby>毎日<rt>まいにち</rt></ruby><ruby>練習<rt>れんしゅう</rt></ruby>' },
    { ja: '素早い判断',       ro: 'subayaihandann',       ruby: '<ruby>素早<rt>すばや</rt></ruby>い<ruby>判断<rt>はんだん</rt></ruby>' },
    { ja: '新しい冒険',       ro: 'atarasiiboukenn',      ruby: '<ruby>新<rt>あたら</rt></ruby>しい<ruby>冒険<rt>ぼうけん</rt></ruby>' },
    { ja: '秘密の近道',       ro: 'himitunotikamiti',    ruby: '<ruby>秘密<rt>ひみつ</rt></ruby>の<ruby>近道<rt>ちかみち</rt></ruby>' },
    { ja: 'きらめく星空',     ro: 'kiramekuhosizora',    ruby: 'きらめく<ruby>星空<rt>ほしぞら</rt></ruby>' },
    { ja: '強い敵が現れた',   ro: 'tuyoitekigaarawareta',  ruby: '<ruby>強<rt>つよ</rt></ruby>い<ruby>敵<rt>てき</rt></ruby>が<ruby>現<rt>あらわ</rt></ruby>れた' },
    { ja: '勇者の旅が始まる', ro: 'yuusyanotabigahazimaru', ruby: '<ruby>勇者<rt>ゆうしゃ</rt></ruby>の<ruby>旅<rt>たび</rt></ruby>が<ruby>始<rt>はじ</rt></ruby>まる' },
    { ja: '落ち着いて打ち込もう', ro: 'otituiteutikomou',  ruby: '<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて<ruby>打<rt>う</rt></ruby>ち<ruby>込<rt>こ</rt></ruby>もう' },
  ],
  5: [
    { ja: '今日も頑張る',         ro: 'kyoumoganbaru',           ruby: '<ruby>今日<rt>きょう</rt></ruby>も<ruby>頑張<rt>がんば</rt></ruby>る' },
    { ja: '早く正しく打つ',       ro: 'hayakutadasikuutu',       ruby: '<ruby>早<rt>はや</rt></ruby>く<ruby>正<rt>ただ</rt></ruby>しく<ruby>打<rt>う</rt></ruby>つ' },
    { ja: '間違えても諦めない',   ro: 'matigaetemoakiramenai',   ruby: '<ruby>間違<rt>まちが</rt></ruby>えても<ruby>諦<rt>あきら</rt></ruby>めない' },
    { ja: '次のステージへ進む',   ro: 'tuginosute-zihesusumu',   ruby: '<ruby>次<rt>つぎ</rt></ruby>のステージへ<ruby>進<rt>すす</rt></ruby>む' },
    { ja: '敵の体力を削る',       ro: 'tekinotairyokuwokezuru',  ruby: '<ruby>敵<rt>てき</rt></ruby>の<ruby>体力<rt>たいりょく</rt></ruby>を<ruby>削<rt>けず</rt></ruby>る' },
    { ja: '少しずつ上手くなる',   ro: 'sukosizutuumakunaru',     ruby: '<ruby>少<rt>すこ</rt></ruby>しずつ<ruby>上手<rt>うま</rt></ruby>くなる' },
    { ja: '最後まで集中する',     ro: 'saigomadesyuutyuusuru',    ruby: '<ruby>最後<rt>さいご</rt></ruby>まで<ruby>集中<rt>しゅうちゅう</rt></ruby>する' },
    { ja: '長いお題に挑戦する',   ro: 'nagaiodainityousensuru',  ruby: '<ruby>長<rt>なが</rt></ruby>いお<ruby>題<rt>だい</rt></ruby>に<ruby>挑戦<rt>ちょうせん</rt></ruby>する' },
    { ja: '制限時間に気をつける', ro: 'seigenzikannikiwotukeru', ruby: '<ruby>制限時間<rt>せいげんじかん</rt></ruby>に<ruby>気<rt>き</rt></ruby>をつける' },
    { ja: '正しく打てば必ず勝てる', ro: 'tadasikuutebakanarazukateru', ruby: '<ruby>正<rt>ただ</rt></ruby>しく<ruby>打<rt>う</rt></ruby>てば<ruby>必<rt>かなら</rt></ruby>ず<ruby>勝<rt>か</rt></ruby>てる' },
  ],
  6: [
    { ja: '今日もタイピングを練習する', ro: 'kyoumotaipinguworensyuusuru',  ruby: '<ruby>今日<rt>きょう</rt></ruby>もタイピングを<ruby>練習<rt>れんしゅう</rt></ruby>する' },
    { ja: '素早く正しく打ち込もう',     ro: 'subayakutadasikuutikomou',     ruby: '<ruby>素早<rt>すばや</rt></ruby>く<ruby>正<rt>ただ</rt></ruby>しく<ruby>打<rt>う</rt></ruby>ち<ruby>込<rt>こ</rt></ruby>もう' },
    { ja: 'お題をよく見て入力する',     ro: 'odaiwoyokumitenyuuryokusuru',  ruby: 'お<ruby>題<rt>だい</rt></ruby>をよく<ruby>見<rt>み</rt></ruby>て<ruby>入力<rt>にゅうりょく</rt></ruby>する' },
    { ja: '敵が現れても落ち着いて打つ', ro: 'tekigaarawaretemootituiteutu', ruby: '<ruby>敵<rt>てき</rt></ruby>が<ruby>現<rt>あらわ</rt></ruby>れても<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて<ruby>打<rt>う</rt></ruby>つ' },
    { ja: 'ミスをしてもすぐに立て直す', ro: 'misuwositemosugunitatenaosu',   ruby: 'ミスをしてもすぐに<ruby>立<rt>た</rt></ruby>て<ruby>直<rt>なお</rt></ruby>す' },
    { ja: '長い文でもリズムよく打つ',   ro: 'nagaibundemorizumuyokuutu',    ruby: '<ruby>長<rt>なが</rt></ruby>い<ruby>文<rt>ぶん</rt></ruby>でもリズムよく<ruby>打<rt>う</rt></ruby>つ' },
    { ja: 'タイムバーを見ながら進める', ro: 'taimuba-wominagarasusumeru',   ruby: 'タイムバーを<ruby>見<rt>み</rt></ruby>ながら<ruby>進<rt>すす</rt></ruby>める' },
    { ja: 'ステージを越えるたびに強くなる', ro: 'sute-ziwokoerutabinituyokunaru', ruby: 'ステージを<ruby>越<rt>こ</rt></ruby>えるたびに<ruby>強<rt>つよ</rt></ruby>くなる' },
    { ja: '連続正解で流れを作る',       ro: 'renzokuseikaidenagarewotukuru', ruby: '<ruby>連続正解<rt>れんぞくせいかい</rt></ruby>で<ruby>流<rt>なが</rt></ruby>れを<ruby>作<rt>つく</rt></ruby>る' },
    { ja: '勝利を目指して最後まで打つ', ro: 'syouriwomezasitesaigomadeutu',  ruby: '<ruby>勝利<rt>しょうり</rt></ruby>を<ruby>目指<rt>めざ</rt></ruby>して<ruby>最後<rt>さいご</rt></ruby>まで<ruby>打<rt>う</rt></ruby>つ' },
  ],
  7: [
    { ja: '暗い森の奥から敵が近づいてきた',   ro: 'kuraimorinookukaratekigatikaduitekita',    ruby: '<ruby>暗<rt>くら</rt></ruby>い<ruby>森<rt>もり</rt></ruby>の<ruby>奥<rt>おく</rt></ruby>から<ruby>敵<rt>てき</rt></ruby>が<ruby>近<rt>ちか</rt></ruby>づいてきた' },
    { ja: '残り時間を見ながら最後まで打つ',   ro: 'nokorizikanwominagarasaigomadeutu',        ruby: '<ruby>残<rt>のこ</rt></ruby>り<ruby>時間<rt>じかん</rt></ruby>を<ruby>見<rt>み</rt></ruby>ながら<ruby>最後<rt>さいご</rt></ruby>まで<ruby>打<rt>う</rt></ruby>つ' },
    { ja: '何度も挑戦して少しずつ上手くなる', ro: 'nandomotyousensitesukosizutuumakunaru',    ruby: '<ruby>何度<rt>なんど</rt></ruby>も<ruby>挑戦<rt>ちょうせん</rt></ruby>して<ruby>少<rt>すこ</rt></ruby>しずつ<ruby>上手<rt>うま</rt></ruby>くなる' },
    { ja: 'ステージが進むほどお題は長くなる', ro: 'sute-zigasusumuhodoodaihanagakunaru',      ruby: 'ステージが<ruby>進<rt>すす</rt></ruby>むほどお<ruby>題<rt>だい</rt></ruby>は<ruby>長<rt>なが</rt></ruby>くなる' },
    { ja: '敵の体力が少しずつ減っていく',     ro: 'tekinotairyokugasukosizutuhetteiku',       ruby: '<ruby>敵<rt>てき</rt></ruby>の<ruby>体力<rt>たいりょく</rt></ruby>が<ruby>少<rt>すこ</rt></ruby>しずつ<ruby>減<rt>へ</rt></ruby>っていく' },
    { ja: '長い言葉でも落ち着けば打ち切れる', ro: 'nagaikotobademootitukebautikireru',         ruby: '<ruby>長<rt>なが</rt></ruby>い<ruby>言葉<rt>ことば</rt></ruby>でも<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>けば<ruby>打<rt>う</rt></ruby>ち<ruby>切<rt>き</rt></ruby>れる' },
    { ja: '指を止めずに正しく入力する',       ro: 'yubiwotomezunitadasikunyuuryokusuru',      ruby: '<ruby>指<rt>ゆび</rt></ruby>を<ruby>止<rt>と</rt></ruby>めずに<ruby>正<rt>ただ</rt></ruby>しく<ruby>入力<rt>にゅうりょく</rt></ruby>する' },
    { ja: 'ミスを減らして自分の記録を超える', ro: 'misuwoherasitezibunnokirokuwokoeru',        ruby: 'ミスを<ruby>減<rt>へ</rt></ruby>らして<ruby>自分<rt>じぶん</rt></ruby>の<ruby>記録<rt>きろく</rt></ruby>を<ruby>超<rt>こ</rt></ruby>える' },
    { ja: '強い敵ほど集中力が大事',           ro: 'tuyoitekihodosyuutyuuryokugadaizi',        ruby: '<ruby>強<rt>つよ</rt></ruby>い<ruby>敵<rt>てき</rt></ruby>ほど<ruby>集中力<rt>しゅうちゅうりょく</rt></ruby>が<ruby>大事<rt>だいじ</rt></ruby>' },
    { ja: 'あと少しで倒せるから気を抜かない', ro: 'atosukosidetaoserukarakiwonukanai',         ruby: 'あと<ruby>少<rt>すこ</rt></ruby>しで<ruby>倒<rt>たお</rt></ruby>せるから<ruby>気<rt>き</rt></ruby>を<ruby>抜<rt>ぬ</rt></ruby>かない' },
  ],
  8: [
    { ja: '巨大なドラゴンが目の前に立ちはだかった', ro: 'kyodainadoragongamenomaenitatihadakatta',   ruby: '<ruby>巨大<rt>きょだい</rt></ruby>なドラゴンが<ruby>目<rt>め</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>に<ruby>立<rt>た</rt></ruby>ちはだかった' },
    { ja: 'ここまで来たなら長い文でも打ち切れる',   ro: 'kokomadekitanaranagaibundemoutikireru',    ruby: 'ここまで<ruby>来<rt>き</rt></ruby>たなら<ruby>長<rt>なが</rt></ruby>い<ruby>文<rt>ぶん</rt></ruby>でも<ruby>打<rt>う</rt></ruby>ち<ruby>切<rt>き</rt></ruby>れる' },
    { ja: '緊張してもお題をよく見て打ち続ける',     ro: 'kintyousitemoodaiwoyokumiteutitudukeru', ruby: '<ruby>緊張<rt>きんちょう</rt></ruby>してもお<ruby>題<rt>だい</rt></ruby>をよく<ruby>見<rt>み</rt></ruby>て<ruby>打<rt>う</rt></ruby>ち<ruby>続<rt>つづ</rt></ruby>ける' },
    { ja: '一つ一つの入力が勝利につながる',         ro: 'hitotuhitotunonyuuryokugasyourinitunagaru', ruby: '<ruby>一<rt>ひと</rt></ruby>つ<ruby>一<rt>ひと</rt></ruby>つの<ruby>入力<rt>にゅうりょく</rt></ruby>が<ruby>勝利<rt>しょうり</rt></ruby>につながる' },
    { ja: '制限時間が迫っても冷静に進める',         ro: 'seigenzikangasemattemoreiseinisusumeru',    ruby: '<ruby>制限時間<rt>せいげんじかん</rt></ruby>が<ruby>迫<rt>せま</rt></ruby>っても<ruby>冷静<rt>れいせい</rt></ruby>に<ruby>進<rt>すす</rt></ruby>める' },
    { ja: '敵の攻撃はなくても時間がプレッシャーになる', ro: 'tekinokougekihanakutemozikangapuressya-ninaru', ruby: '<ruby>敵<rt>てき</rt></ruby>の<ruby>攻撃<rt>こうげき</rt></ruby>はなくても<ruby>時間<rt>じかん</rt></ruby>がプレッシャーになる' },
    { ja: '長いお題を最後まで打てば次へ進める',     ro: 'nagaiodaiwosaigomadeutebatugihesusumeru',  ruby: '<ruby>長<rt>なが</rt></ruby>いお<ruby>題<rt>だい</rt></ruby>を<ruby>最後<rt>さいご</rt></ruby>まで<ruby>打<rt>う</rt></ruby>てば<ruby>次<rt>つぎ</rt></ruby>へ<ruby>進<rt>すす</rt></ruby>める' },
    { ja: '一瞬の迷いがタイムロスにつながる',       ro: 'issyunnomayoigataimurosunitunagaru',       ruby: '<ruby>一瞬<rt>いっしゅん</rt></ruby>の<ruby>迷<rt>まよ</rt></ruby>いがタイムロスにつながる' },
    { ja: '自分の最高到達ステージを超える',         ro: 'zibunnosaikoutoutatusute-ziwokoeru',       ruby: '<ruby>自分<rt>じぶん</rt></ruby>の<ruby>最高<rt>さいこう</rt></ruby><ruby>到達<rt>とうたつ</rt></ruby>ステージを<ruby>超<rt>こ</rt></ruby>える' },
    { ja: '最後の一文字まで丁寧に打ち込む',         ro: 'saigonoitimozimadeteineiniutikomu',       ruby: '<ruby>最後<rt>さいご</rt></ruby>の<ruby>一文字<rt>いちもじ</rt></ruby>まで<ruby>丁寧<rt>ていねい</rt></ruby>に<ruby>打<rt>う</rt></ruby>ち<ruby>込<rt>こ</rt></ruby>む' },
  ],
  9: [
    { ja: '残り時間が少なくても落ち着いて最後まで打ち切ろう', ro: 'nokorizikangasukunakutemootituitesaigomadeutikirou', ruby: '<ruby>残<rt>のこ</rt></ruby>り<ruby>時間<rt>じかん</rt></ruby>が<ruby>少<rt>すく</rt></ruby>なくても<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて<ruby>最後<rt>さいご</rt></ruby>まで<ruby>打<rt>う</rt></ruby>ち<ruby>切<rt>き</rt></ruby>ろう' },
    { ja: '長いお題でも一文字ずつ正確に打てば進める', ro: 'nagaiodaidemoitimozizutuseikakuniutebasusumeru', ruby: '<ruby>長<rt>なが</rt></ruby>いお<ruby>題<rt>だい</rt></ruby>でも<ruby>一文字<rt>いちもじ</rt></ruby>ずつ<ruby>正確<rt>せいかく</rt></ruby>に<ruby>打<rt>う</rt></ruby>てば<ruby>進<rt>すす</rt></ruby>める' },
    { ja: '敵の気配を感じながら素早く文章を読み取る', ro: 'tekinokehaiwokanzinagarasubayakubunsyouwoyomitoru', ruby: '<ruby>敵<rt>てき</rt></ruby>の<ruby>気配<rt>けはい</rt></ruby>を<ruby>感<rt>かん</rt></ruby>じながら<ruby>素早<rt>すばや</rt></ruby>く<ruby>文章<rt>ぶんしょう</rt></ruby>を<ruby>読<rt>よ</rt></ruby>み<ruby>取<rt>と</rt></ruby>る' },
    { ja: '焦って間違えるより落ち着いて正しく打つことが大事', ro: 'asettematigaeruyoriotituitetadasikuutukotogadaizi', ruby: '<ruby>焦<rt>あせ</rt></ruby>って<ruby>間違<rt>まちが</rt></ruby>えるより<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて<ruby>正<rt>ただ</rt></ruby>しく<ruby>打<rt>う</rt></ruby>つことが<ruby>大事<rt>だいじ</rt></ruby>' },
    { ja: 'ステージが進むほど集中力が試される', ro: 'sute-zigasusumuhodosyuutyuuryokugatamesareru', ruby: 'ステージが<ruby>進<rt>すす</rt></ruby>むほど<ruby>集中力<rt>しゅうちゅうりょく</rt></ruby>が<ruby>試<rt>ため</rt></ruby>される' },
    { ja: '一度ミスをしても気持ちを切り替えて次の文字へ進む', ro: 'itidomisuwositemokimotiwokirikaetetuginomozihesusumu', ruby: '<ruby>一度<rt>いちど</rt></ruby>ミスをしても<ruby>気持<rt>きも</rt></ruby>ちを<ruby>切<rt>き</rt></ruby>り<ruby>替<rt>か</rt></ruby>えて<ruby>次<rt>つぎ</rt></ruby>の<ruby>文字<rt>もじ</rt></ruby>へ<ruby>進<rt>すす</rt></ruby>む' },
    { ja: '画面のお題をよく見ながら指を止めずに進める', ro: 'gamennoodaiwoyokuminagarayubiwotomezunisusumeru', ruby: '<ruby>画面<rt>がめん</rt></ruby>のお<ruby>題<rt>だい</rt></ruby>をよく<ruby>見<rt>み</rt></ruby>ながら<ruby>指<rt>ゆび</rt></ruby>を<ruby>止<rt>と</rt></ruby>めずに<ruby>進<rt>すす</rt></ruby>める' },
    { ja: '勝利まであと少しのところでこそ集中する', ro: 'syourimadeatosukosinotokorodekososyuutyuusuru', ruby: '<ruby>勝利<rt>しょうり</rt></ruby>まであと<ruby>少<rt>すこ</rt></ruby>しのところでこそ<ruby>集中<rt>しゅうちゅう</rt></ruby>する' },
    { ja: '何度も負けても次はもっと先へ進めると信じる', ro: 'nandomomaketemotugihamottosakihesusumerutosinziru', ruby: '<ruby>何度<rt>なんど</rt></ruby>も<ruby>負<rt>ま</rt></ruby>けても<ruby>次<rt>つぎ</rt></ruby>はもっと<ruby>先<rt>さき</rt></ruby>へ<ruby>進<rt>すす</rt></ruby>めると<ruby>信<rt>しん</rt></ruby>じる' },
    { ja: '敵の姿に惑わされずにお題だけを見続ける', ro: 'tekinosugatanimadowasarezuniodaidakewomitudukeru', ruby: '<ruby>敵<rt>てき</rt></ruby>の<ruby>姿<rt>すがた</rt></ruby>に<ruby>惑<rt>まど</rt></ruby>わされずにお<ruby>題<rt>だい</rt></ruby>だけを<ruby>見<rt>み</rt></ruby><ruby>続<rt>つづ</rt></ruby>ける' },
  ],
  10: [
    { ja: '強い敵を前にしても諦めずに文章を最後まで入力する', ro: 'tuyoitekiwomaenisitemoakiramezunibunsyouwosaigomadenyuuryokusuru', ruby: '<ruby>強<rt>つよ</rt></ruby>い<ruby>敵<rt>てき</rt></ruby>を<ruby>前<rt>まえ</rt></ruby>にしても<ruby>諦<rt>あきら</rt></ruby>めずに<ruby>文章<rt>ぶんしょう</rt></ruby>を<ruby>最後<rt>さいご</rt></ruby>まで<ruby>入力<rt>にゅうりょく</rt></ruby>する' },
    { ja: '長い文章を打つときは速さよりもリズムを保つことが大切', ro: 'nagaibunsyouwoututokihahayasayorimorizumuwotamotukotogataisetu', ruby: '<ruby>長<rt>なが</rt></ruby>い<ruby>文章<rt>ぶんしょう</rt></ruby>を<ruby>打<rt>う</rt></ruby>つときは<ruby>速<rt>はや</rt></ruby>さよりもリズムを<ruby>保<rt>たも</rt></ruby>つことが<ruby>大切<rt>たいせつ</rt></ruby>' },
    { ja: '少しずつ難しくなるお題に慣れていけば必ず上達できる', ro: 'sukosizutumuzukasikunaruodaininareteikebakanarazujoutatudekiru', ruby: '<ruby>少<rt>すこ</rt></ruby>しずつ<ruby>難<rt>むずか</rt></ruby>しくなるお<ruby>題<rt>だい</rt></ruby>に<ruby>慣<rt>な</rt></ruby>れていけば<ruby>必<rt>かなら</rt></ruby>ず<ruby>上達<rt>じょうたつ</rt></ruby>できる' },
    { ja: '目の前の一文に集中して余計なことを考えずに打ち進める', ro: 'menomaenoitibunnisyuutyuusiteyokeinakotowokangaezuniutisusumeru', ruby: '<ruby>目<rt>め</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>の<ruby>一文<rt>いちぶん</rt></ruby>に<ruby>集中<rt>しゅうちゅう</rt></ruby>して<ruby>余計<rt>よけい</rt></ruby>なことを<ruby>考<rt>かんが</rt></ruby>えずに<ruby>打<rt>う</rt></ruby>ち<ruby>進<rt>すす</rt></ruby>める' },
    { ja: '制限時間が迫るほど心は焦るけれど指先は冷静に動かす', ro: 'seigenzikangasemaruhodokokorohaaserukeredoyubisakihareiseiniugokasu', ruby: '<ruby>制限時間<rt>せいげんじかん</rt></ruby>が<ruby>迫<rt>せま</rt></ruby>るほど<ruby>心<rt>こころ</rt></ruby>は<ruby>焦<rt>あせ</rt></ruby>るけれど<ruby>指先<rt>ゆびさき</rt></ruby>は<ruby>冷静<rt>れいせい</rt></ruby>に<ruby>動<rt>うご</rt></ruby>かす' },
    { ja: '何度も挑戦することで苦手だった長い文にも少しずつ慣れていく', ro: 'nandomotyousensurukotodenigatedattanagaibunnimosukosizutunareteiku', ruby: '<ruby>何度<rt>なんど</rt></ruby>も<ruby>挑戦<rt>ちょうせん</rt></ruby>することで<ruby>苦手<rt>にがて</rt></ruby>だった<ruby>長<rt>なが</rt></ruby>い<ruby>文<rt>ぶん</rt></ruby>にも<ruby>少<rt>すこ</rt></ruby>しずつ<ruby>慣<rt>な</rt></ruby>れていく' },
    { ja: '敵を倒すためには最後の一文字まで油断せずに入力する', ro: 'tekiwotaosutamenihasaigonoitimozimadeyudansezuninyuuryokusuru', ruby: '<ruby>敵<rt>てき</rt></ruby>を<ruby>倒<rt>たお</rt></ruby>すためには<ruby>最後<rt>さいご</rt></ruby>の<ruby>一文字<rt>いちもじ</rt></ruby>まで<ruby>油断<rt>ゆだん</rt></ruby>せずに<ruby>入力<rt>にゅうりょく</rt></ruby>する' },
    { ja: 'タイムバーが減っていくのを見ながら緊張感の中で戦う', ro: 'taimuba-gahetteikunowominagarakintyoukannonakadetatakau', ruby: 'タイムバーが<ruby>減<rt>へ</rt></ruby>っていくのを<ruby>見<rt>み</rt></ruby>ながら<ruby>緊張感<rt>きんちょうかん</rt></ruby>の<ruby>中<rt>なか</rt></ruby>で<ruby>戦<rt>たたか</rt></ruby>う' },
    { ja: '今の自分の限界を超えるために難しいお題へ挑戦する', ro: 'imanozibunnogenkaiwokoerutamenimuzukasiiodaihetyousensuru', ruby: '<ruby>今<rt>いま</rt></ruby>の<ruby>自分<rt>じぶん</rt></ruby>の<ruby>限界<rt>げんかい</rt></ruby>を<ruby>超<rt>こ</rt></ruby>えるために<ruby>難<rt>むずか</rt></ruby>しいお<ruby>題<rt>だい</rt></ruby>へ<ruby>挑戦<rt>ちょうせん</rt></ruby>する' },
    { ja: '長いお題を打ち切ったときの達成感が次の力になる', ro: 'nagaiodaiwoutikittatokinotasseikangatuginotikaraninaru', ruby: '<ruby>長<rt>なが</rt></ruby>いお<ruby>題<rt>だい</rt></ruby>を<ruby>打<rt>う</rt></ruby>ち<ruby>切<rt>き</rt></ruby>ったときの<ruby>達成感<rt>たっせいかん</rt></ruby>が<ruby>次<rt>つぎ</rt></ruby>の<ruby>力<rt>ちから</rt></ruby>になる' },
  ],
  11: [
    { ja: '暗い洞窟の奥で待ち構える敵に向かって静かに一歩踏み出す', ro: 'kuraidoukutunookudematikamaerutekinimukattesizukaniippohumidasu', ruby: '<ruby>暗<rt>くら</rt></ruby>い<ruby>洞窟<rt>どうくつ</rt></ruby>の<ruby>奥<rt>おく</rt></ruby>で<ruby>待<rt>ま</rt></ruby>ち<ruby>構<rt>かま</rt></ruby>える<ruby>敵<rt>てき</rt></ruby>に<ruby>向<rt>む</rt></ruby>かって<ruby>静<rt>しず</rt></ruby>かに<ruby>一歩<rt>いっぽ</rt></ruby><ruby>踏<rt>ふ</rt></ruby>み<ruby>出<rt>だ</rt></ruby>す' },
    { ja: '長いお題を読みながら次に打つ文字を少しだけ先に意識する', ro: 'nagaiodaiwoyominagaratuginiutumoziosukosidakesakiniisikisuru', ruby: '<ruby>長<rt>なが</rt></ruby>いお<ruby>題<rt>だい</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みながら<ruby>次<rt>つぎ</rt></ruby>に<ruby>打<rt>う</rt></ruby>つ<ruby>文字<rt>もじ</rt></ruby>を<ruby>少<rt>すこ</rt></ruby>しだけ<ruby>先<rt>さき</rt></ruby>に<ruby>意識<rt>いしき</rt></ruby>する' },
    { ja: 'ここまで進んできた経験を信じて落ち着いて指を動かし続ける', ro: 'kokomadesusundekitakeikenwosinziteotituiteyubiwougokasitudukeru', ruby: 'ここまで<ruby>進<rt>すす</rt></ruby>んできた<ruby>経験<rt>けいけん</rt></ruby>を<ruby>信<rt>しん</rt></ruby>じて<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて<ruby>指<rt>ゆび</rt></ruby>を<ruby>動<rt>うご</rt></ruby>かし<ruby>続<rt>つづ</rt></ruby>ける' },
    { ja: '一つのミスで流れが崩れてもすぐに立て直せばまだ勝てる', ro: 'hitotunomisudenagaregakuzuretemosugunitatenaosebamadakateru', ruby: '<ruby>一<rt>ひと</rt></ruby>つのミスで<ruby>流<rt>なが</rt></ruby>れが<ruby>崩<rt>くず</rt></ruby>れてもすぐに<ruby>立<rt>た</rt></ruby>て<ruby>直<rt>なお</rt></ruby>せばまだ<ruby>勝<rt>か</rt></ruby>てる' },
    { ja: '強敵との戦いでは速く打つ力だけでなく冷静さも武器になる', ro: 'kyoutekitonotatakaidehahayakuututikaradakedenakureiseisamobukininaru', ruby: '<ruby>強敵<rt>きょうてき</rt></ruby>との<ruby>戦<rt>たたか</rt></ruby>いでは<ruby>速<rt>はや</rt></ruby>く<ruby>打<rt>う</rt></ruby>つ<ruby>力<rt>ちから</rt></ruby>だけでなく<ruby>冷静<rt>れいせい</rt></ruby>さも<ruby>武器<rt>ぶき</rt></ruby>になる' },
    { ja: '残り時間を確認しながらも目線はできるだけお題から離さない', ro: 'nokorizikanwokakuninsinagaramomesenhadekirudakeodaikarahanasanai', ruby: '<ruby>残<rt>のこ</rt></ruby>り<ruby>時間<rt>じかん</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>しながらも<ruby>目線<rt>めせん</rt></ruby>はできるだけお<ruby>題<rt>だい</rt></ruby>から<ruby>離<rt>はな</rt></ruby>さない' },
    { ja: '文章が長くなるほど最初から最後まで集中を保つ力がいる', ro: 'bunsyouganagakunaruhodosaisyokarasaigomadesyuutyuuwotamotutikaragairu', ruby: '<ruby>文章<rt>ぶんしょう</rt></ruby>が<ruby>長<rt>なが</rt></ruby>くなるほど<ruby>最初<rt>さいしょ</rt></ruby>から<ruby>最後<rt>さいご</rt></ruby>まで<ruby>集中<rt>しゅうちゅう</rt></ruby>を<ruby>保<rt>たも</rt></ruby>つ<ruby>力<rt>ちから</rt></ruby>がいる' },
    { ja: '何度負けても次はもっと先へ進めると信じて挑戦し続ける', ro: 'nandomaketemotugihamottosakihesusumerutosinzitetyousensitudukeru', ruby: '<ruby>何度<rt>なんど</rt></ruby><ruby>負<rt>ま</rt></ruby>けても<ruby>次<rt>つぎ</rt></ruby>はもっと<ruby>先<rt>さき</rt></ruby>へ<ruby>進<rt>すす</rt></ruby>めると<ruby>信<rt>しん</rt></ruby>じて<ruby>挑戦<rt>ちょうせん</rt></ruby>し<ruby>続<rt>つづ</rt></ruby>ける' },
    { ja: '焦る気持ちを抑えながら正しい順番でローマ字を打ち込んでいく', ro: 'aserukimotiwoosaenagaratadasiijunbandero-maziwoutikondeiku', ruby: '<ruby>焦<rt>あせ</rt></ruby>る<ruby>気持<rt>きも</rt></ruby>ちを<ruby>抑<rt>おさ</rt></ruby>えながら<ruby>正<rt>ただ</rt></ruby>しい<ruby>順番<rt>じゅんばん</rt></ruby>でローマ<ruby>字<rt>じ</rt></ruby>を<ruby>打<rt>う</rt></ruby>ち<ruby>込<rt>こ</rt></ruby>んでいく' },
    { ja: '強いプレッシャーの中でも最後までお題から目をそらさない', ro: 'tuyoipuressya-nokademosaigomadeodaikaramewosorasanai', ruby: '<ruby>強<rt>つよ</rt></ruby>いプレッシャーの<ruby>中<rt>なか</rt></ruby>でも<ruby>最後<rt>さいご</rt></ruby>までお<ruby>題<rt>だい</rt></ruby>から<ruby>目<rt>め</rt></ruby>をそらさない' },
  ],
  12: [
    { ja: '目の前に現れた巨大な影がゆっくりとこちらへ近づいてくる', ro: 'menomaeniarawaretakyodainakagegayukkuritokotirahetikaduitekuru', ruby: '<ruby>目<rt>め</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>に<ruby>現<rt>あらわ</rt></ruby>れた<ruby>巨大<rt>きょだい</rt></ruby>な<ruby>影<rt>かげ</rt></ruby>がゆっくりとこちらへ<ruby>近<rt>ちか</rt></ruby>づいてくる' },
    { ja: '指先が疲れてきても最後の一文を打ち切るまでは気を抜かない', ro: 'yubisakigatukaretekitemosaigonoitibunwoutikirumadehakiwonukanai', ruby: '<ruby>指先<rt>ゆびさき</rt></ruby>が<ruby>疲<rt>つか</rt></ruby>れてきても<ruby>最後<rt>さいご</rt></ruby>の<ruby>一文<rt>いちぶん</rt></ruby>を<ruby>打<rt>う</rt></ruby>ち<ruby>切<rt>き</rt></ruby>るまでは<ruby>気<rt>き</rt></ruby>を<ruby>抜<rt>ぬ</rt></ruby>かない' },
    { ja: '緊張で手が止まりそうなときこそ深呼吸してお題を見直す', ro: 'kintyoudetegatomarisounatokikososinkokyuusiteodaiwominaosu', ruby: '<ruby>緊張<rt>きんちょう</rt></ruby>で<ruby>手<rt>て</rt></ruby>が<ruby>止<rt>と</rt></ruby>まりそうなときこそ<ruby>深呼吸<rt>しんこきゅう</rt></ruby>してお<ruby>題<rt>だい</rt></ruby>を<ruby>見直<rt>みなお</rt></ruby>す' },
    { ja: '一つ一つの正確な入力が強い敵を倒す力になる', ro: 'hitotuhitotunoseikakunanyuuryokugatuyoitekiwotaosutikaraninaru', ruby: '<ruby>一<rt>ひと</rt></ruby>つ<ruby>一<rt>ひと</rt></ruby>つの<ruby>正確<rt>せいかく</rt></ruby>な<ruby>入力<rt>にゅうりょく</rt></ruby>が<ruby>強<rt>つよ</rt></ruby>い<ruby>敵<rt>てき</rt></ruby>を<ruby>倒<rt>たお</rt></ruby>す<ruby>力<rt>ちから</rt></ruby>になる' },
    { ja: '長い文章に見えても短いかたまりに分ければ少しずつ進める', ro: 'nagaibunsyounimietemomizikaikatamariniwakerebasukosizutususumeru', ruby: '<ruby>長<rt>なが</rt></ruby>い<ruby>文章<rt>ぶんしょう</rt></ruby>に<ruby>見<rt>み</rt></ruby>えても<ruby>短<rt>みじか</rt></ruby>いかたまりに<ruby>分<rt>わ</rt></ruby>ければ<ruby>少<rt>すこ</rt></ruby>しずつ<ruby>進<rt>すす</rt></ruby>める' },
    { ja: 'ステージの奥へ進むほど敵は強くなりお題も容赦なく長くなる', ro: 'sute-zinookuhesusumuhodotekihatuyokunariodaimoyousyanakunagakunaru', ruby: 'ステージの<ruby>奥<rt>おく</rt></ruby>へ<ruby>進<rt>すす</rt></ruby>むほど<ruby>敵<rt>てき</rt></ruby>は<ruby>強<rt>つよ</rt></ruby>くなりお<ruby>題<rt>だい</rt></ruby>も<ruby>容赦<rt>ようしゃ</rt></ruby>なく<ruby>長<rt>なが</rt></ruby>くなる' },
    { ja: 'タイムバーが残りわずかになっても最後まで勝負を捨てない', ro: 'taimuba-ganokoriwazukaninattemosaigomadesyoubuwosutenai', ruby: 'タイムバーが<ruby>残<rt>のこ</rt></ruby>りわずかになっても<ruby>最後<rt>さいご</rt></ruby>まで<ruby>勝負<rt>しょうぶ</rt></ruby>を<ruby>捨<rt>す</rt></ruby>てない' },
    { ja: '今までの練習で身につけた集中力をここで全部出し切ろう', ro: 'imamadenorensyuudeminituketasyuutyuuryokuwokokodezenbudasikirou', ruby: '<ruby>今<rt>いま</rt></ruby>までの<ruby>練習<rt>れんしゅう</rt></ruby>で<ruby>身<rt>み</rt></ruby>につけた<ruby>集中力<rt>しゅうちゅうりょく</rt></ruby>をここで<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>出<rt>だ</rt></ruby>し<ruby>切<rt>き</rt></ruby>ろう' },
    { ja: '長いお題を前にしても一つずつ区切って読めば必ず打てる', ro: 'nagaiodaiwomaenisitemohitotuzutukugitteyomebakanarazuuteru', ruby: '<ruby>長<rt>なが</rt></ruby>いお<ruby>題<rt>だい</rt></ruby>を<ruby>前<rt>まえ</rt></ruby>にしても<ruby>一<rt>ひと</rt></ruby>つずつ<ruby>区切<rt>くぎ</rt></ruby>って<ruby>読<rt>よ</rt></ruby>めば<ruby>必<rt>かなら</rt></ruby>ず<ruby>打<rt>う</rt></ruby>てる' },
    { ja: 'ここからは速さだけでなく最後まで崩れない正確さが必要になる', ro: 'kokokarahahayasadakedenakusaigomadekuzurenaiseikakusagahituyouninaru', ruby: 'ここからは<ruby>速<rt>はや</rt></ruby>さだけでなく<ruby>最後<rt>さいご</rt></ruby>まで<ruby>崩<rt>くず</rt></ruby>れない<ruby>正確<rt>せいかく</rt></ruby>さが<ruby>必要<rt>ひつよう</rt></ruby>になる' },
  ],
  13: [
    { ja: '強大な敵を前にしても心を乱さず目の前の一文字だけに集中する', ro: 'kyoudainatekiwomaenisitemokokorowomidasazumenomaenoitimozidakenisyuutyuusuru', ruby: '<ruby>強大<rt>きょうだい</rt></ruby>な<ruby>敵<rt>てき</rt></ruby>を<ruby>前<rt>まえ</rt></ruby>にしても<ruby>心<rt>こころ</rt></ruby>を<ruby>乱<rt>みだ</rt></ruby>さず<ruby>目<rt>め</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>の<ruby>一文字<rt>いちもじ</rt></ruby>だけに<ruby>集中<rt>しゅうちゅう</rt></ruby>する' },
    { ja: '長い戦いの中で大切なのは速さだけではなく正確に続ける力だ', ro: 'nagaitatakainonakadetaisetunanohahayasadakedehanakuseikakunitudukerutikarada', ruby: '<ruby>長<rt>なが</rt></ruby>い<ruby>戦<rt>たたか</rt></ruby>いの<ruby>中<rt>なか</rt></ruby>で<ruby>大切<rt>たいせつ</rt></ruby>なのは<ruby>速<rt>はや</rt></ruby>さだけではなく<ruby>正確<rt>せいかく</rt></ruby>に<ruby>続<rt>つづ</rt></ruby>ける<ruby>力<rt>ちから</rt></ruby>だ' },
    { ja: '何度も入力を重ねるうちに難しかった文章も少しずつ読めてくる', ro: 'nandomonyuuryokuokasaneruutinimuzukasikattabunsyoumosukosizutuyometekuru', ruby: '<ruby>何度<rt>なんど</rt></ruby>も<ruby>入力<rt>にゅうりょく</rt></ruby>を<ruby>重<rt>かさ</rt></ruby>ねるうちに<ruby>難<rt>むずか</rt></ruby>しかった<ruby>文章<rt>ぶんしょう</rt></ruby>も<ruby>少<rt>すこ</rt></ruby>しずつ<ruby>読<rt>よ</rt></ruby>めてくる' },
    { ja: '残り時間が赤く光り始めても焦らずに最後の単語まで追いかける', ro: 'nokorizikangaakakuhikarihazimetemoaserazunisaigonotangomadeoikakeru', ruby: '<ruby>残<rt>のこ</rt></ruby>り<ruby>時間<rt>じかん</rt></ruby>が<ruby>赤<rt>あか</rt></ruby>く<ruby>光<rt>ひか</rt></ruby>り<ruby>始<rt>はじ</rt></ruby>めても<ruby>焦<rt>あせ</rt></ruby>らずに<ruby>最後<rt>さいご</rt></ruby>の<ruby>単語<rt>たんご</rt></ruby>まで<ruby>追<rt>お</rt></ruby>いかける' },
    { ja: '敵の体力があと少しになった瞬間こそミスをしないように気をつける', ro: 'tekinotairyokugaatosukosininattasyunkankosomisuwosinaiyounikiwotukeru', ruby: '<ruby>敵<rt>てき</rt></ruby>の<ruby>体力<rt>たいりょく</rt></ruby>があと<ruby>少<rt>すこ</rt></ruby>しになった<ruby>瞬間<rt>しゅんかん</rt></ruby>こそミスをしないように<ruby>気<rt>き</rt></ruby>をつける' },
    { ja: '指が止まりそうになっても次の文字を見つけてすぐに動き出す', ro: 'yubigatomarisouninattemotuginomoziwomituketesuguniugokidasu', ruby: '<ruby>指<rt>ゆび</rt></ruby>が<ruby>止<rt>と</rt></ruby>まりそうになっても<ruby>次<rt>つぎ</rt></ruby>の<ruby>文字<rt>もじ</rt></ruby>を<ruby>見<rt>み</rt></ruby>つけてすぐに<ruby>動<rt>うご</rt></ruby>き<ruby>出<rt>だ</rt></ruby>す' },
    { ja: '長文を打ち切ったときの達成感を思い出してもう一度挑戦する', ro: 'tyoubunwoutikittatokinotasseikanwoomoidasitemouitidotyousensuru', ruby: '<ruby>長文<rt>ちょうぶん</rt></ruby>を<ruby>打<rt>う</rt></ruby>ち<ruby>切<rt>き</rt></ruby>ったときの<ruby>達成感<rt>たっせいかん</rt></ruby>を<ruby>思<rt>おも</rt></ruby>い<ruby>出<rt>だ</rt></ruby>してもう<ruby>一度<rt>いちど</rt></ruby><ruby>挑戦<rt>ちょうせん</rt></ruby>する' },
    { ja: 'ここから先のステージでは一瞬の迷いが敗北につながることもある', ro: 'kokokarasakinosute-zidehaissyunnomayoigahaibokunitunagarukotomoaru', ruby: 'ここから<ruby>先<rt>さき</rt></ruby>のステージでは<ruby>一瞬<rt>いっしゅん</rt></ruby>の<ruby>迷<rt>まよ</rt></ruby>いが<ruby>敗北<rt>はいぼく</rt></ruby>につながることもある' },
    { ja: 'どれだけ長い文章でも落ち着いて一文字ずつ入力すれば最後までたどり着ける', ro: 'doredakenagaibunsyoudemootituiteitimozizutunyuuryokusurebasaigomadetadoritukeru', ruby: 'どれだけ<ruby>長<rt>なが</rt></ruby>い<ruby>文章<rt>ぶんしょう</rt></ruby>でも<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて<ruby>一文字<rt>いちもじ</rt></ruby>ずつ<ruby>入力<rt>にゅうりょく</rt></ruby>すれば<ruby>最後<rt>さいご</rt></ruby>まで<ruby>辿<rt>たど</rt></ruby>り<ruby>着<rt>つ</rt></ruby>ける' },
    { ja: '時間に追われるほど焦りは強くなるがそれでもお題をよく見て正確に打つ', ro: 'zikanniowareruhodoaserihatuyokunarugasoredemoodaiwoyokumiteseikakuniutu', ruby: '<ruby>時間<rt>じかん</rt></ruby>に<ruby>追<rt>お</rt></ruby>われるほど<ruby>焦<rt>あせ</rt></ruby>りは<ruby>強<rt>つよ</rt></ruby>くなるがそれでもお<ruby>題<rt>だい</rt></ruby>をよく<ruby>見<rt>み</rt></ruby>て<ruby>正確<rt>せいかく</rt></ruby>に<ruby>打<rt>う</rt></ruby>つ' },
  ],
  14: [
    { ja: '静まり返った戦場でタイムバーだけが少しずつ短くなっていく', ro: 'sizumarikaettasenjoudetaimuba-dakegasukosizutumizikakunatteiku', ruby: '<ruby>静<rt>しず</rt></ruby>まり<ruby>返<rt>かえ</rt></ruby>った<ruby>戦場<rt>せんじょう</rt></ruby>でタイムバーだけが<ruby>少<rt>すこ</rt></ruby>しずつ<ruby>短<rt>みじか</rt></ruby>くなっていく' },
    { ja: '目の前の長い文章を最後まで打ち切れば次のステージへの道が開く', ro: 'menomaenonagaibunsyouwosaigomadeutikirebatuginosute-zihenomitigahiraku', ruby: '<ruby>目<rt>め</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>の<ruby>長<rt>なが</rt></ruby>い<ruby>文章<rt>ぶんしょう</rt></ruby>を<ruby>最後<rt>さいご</rt></ruby>まで<ruby>打<rt>う</rt></ruby>ち<ruby>切<rt>き</rt></ruby>れば<ruby>次<rt>つぎ</rt></ruby>のステージへの<ruby>道<rt>みち</rt></ruby>が<ruby>開<rt>ひら</rt></ruby>く' },
    { ja: 'どれだけ強い敵が現れても正確に打ち続ければ必ず勝機は見えてくる', ro: 'doredaketuyoitekigaarawaretemoseikakuniutitudukerebakanarazusyoukihamietekuru', ruby: 'どれだけ<ruby>強<rt>つよ</rt></ruby>い<ruby>敵<rt>てき</rt></ruby>が<ruby>現<rt>あらわ</rt></ruby>れても<ruby>正確<rt>せいかく</rt></ruby>に<ruby>打<rt>う</rt></ruby>ち<ruby>続<rt>つづ</rt></ruby>ければ<ruby>必<rt>かなら</rt></ruby>ず<ruby>勝機<rt>しょうき</rt></ruby>は<ruby>見<rt>み</rt></ruby>えてくる' },
    { ja: '焦る気持ちを抑えながら一文字ずつ確実にローマ字を打ち込んでいく', ro: 'aserukimotiwoosaenagaraitimozizutukakuzituniro-maziwoutikondeiku', ruby: '<ruby>焦<rt>あせ</rt></ruby>る<ruby>気持<rt>きも</rt></ruby>ちを<ruby>抑<rt>おさ</rt></ruby>えながら<ruby>一文字<rt>いちもじ</rt></ruby>ずつ<ruby>確実<rt>かくじつ</rt></ruby>にローマ<ruby>字<rt>じ</rt></ruby>を<ruby>打<rt>う</rt></ruby>ち<ruby>込<rt>こ</rt></ruby>んでいく' },
    { ja: '長く険しいステージを越えるためには集中力を最後まで切らしてはいけない', ro: 'nagakukewasiisute-ziwokoerutamenihasyuutyuuryokuwosaigomadekirasitehaikenai', ruby: '<ruby>長<rt>なが</rt></ruby>く<ruby>険<rt>けわ</rt></ruby>しいステージを<ruby>越<rt>こ</rt></ruby>えるためには<ruby>集中力<rt>しゅうちゅうりょく</rt></ruby>を<ruby>最後<rt>さいご</rt></ruby>まで<ruby>切<rt>き</rt></ruby>らしてはいけない' },
    { ja: 'たとえ途中で入力を間違えてもすぐに修正して前へ進める', ro: 'tatoetotyuudenyuuryokuwomatigaetemosugunisyuuseisitemaehesusumeru', ruby: 'たとえ<ruby>途中<rt>とちゅう</rt></ruby>で<ruby>入力<rt>にゅうりょく</rt></ruby>を<ruby>間違<rt>まちが</rt></ruby>えてもすぐに<ruby>修正<rt>しゅうせい</rt></ruby>して<ruby>前<rt>まえ</rt></ruby>へ<ruby>進<rt>すす</rt></ruby>める' },
    { ja: '勝利目前の油断が一番危ないから最後の一文字まで丁寧に打ち込む', ro: 'syourimokuzennoyudangaitibannabunaikarasaigonoitimozimadeteineiniutikomu', ruby: '<ruby>勝利<rt>しょうり</rt></ruby><ruby>目前<rt>もくぜん</rt></ruby>の<ruby>油断<rt>ゆだん</rt></ruby>が<ruby>一番<rt>いちばん</rt></ruby><ruby>危<rt>あぶ</rt></ruby>ないから<ruby>最後<rt>さいご</rt></ruby>の<ruby>一文字<rt>いちもじ</rt></ruby>まで<ruby>丁寧<rt>ていねい</rt></ruby>に<ruby>打<rt>う</rt></ruby>ち<ruby>込<rt>こ</rt></ruby>む' },
    { ja: 'ここまで積み重ねてきたすべての経験がこの難関ステージで試される', ro: 'kokomadetumikasanetekitasubetenokeikengakononankansute-zidetamesareru', ruby: 'ここまで<ruby>積<rt>つ</rt></ruby>み<ruby>重<rt>かさ</rt></ruby>ねてきたすべての<ruby>経験<rt>けいけん</rt></ruby>がこの<ruby>難関<rt>なんかん</rt></ruby>ステージで<ruby>試<rt>ため</rt></ruby>される' },
    { ja: '残り時間が少なくなって画面が赤く光り始めてもお題を見失わない', ro: 'nokorizikangasukunakunattegamengaakakuhikarihazimetemoodaiwomiusinawanai', ruby: '<ruby>残<rt>のこ</rt></ruby>り<ruby>時間<rt>じかん</rt></ruby>が<ruby>少<rt>すく</rt></ruby>なくなって<ruby>画面<rt>がめん</rt></ruby>が<ruby>赤<rt>あか</rt></ruby>く<ruby>光<rt>ひか</rt></ruby>り<ruby>始<rt>はじ</rt></ruby>めてもお<ruby>題<rt>だい</rt></ruby>を<ruby>見失<rt>みうしな</rt></ruby>わない' },
    { ja: '長い文章を最後まで打ち切るために目と指の動きをしっかり合わせる', ro: 'nagaibunsyouwosaigomadeutikirutamenimetoyubinougokiwosikkariawaseru', ruby: '<ruby>長<rt>なが</rt></ruby>い<ruby>文章<rt>ぶんしょう</rt></ruby>を<ruby>最後<rt>さいご</rt></ruby>まで<ruby>打<rt>う</rt></ruby>ち<ruby>切<rt>き</rt></ruby>るために<ruby>目<rt>め</rt></ruby>と<ruby>指<rt>ゆび</rt></ruby>の<ruby>動<rt>うご</rt></ruby>きをしっかり<ruby>合<rt>あ</rt></ruby>わせる' },
  ],
  15: [
    { ja: '果てしなく続くステージの先で待ち構える敵に向かって最後まで挑み続ける', ro: 'hatesinakutudukusute-zinosakidematikamaerutekinimukattesaigomadeidomitudukeru', ruby: '<ruby>果<rt>は</rt></ruby>てしなく<ruby>続<rt>つづ</rt></ruby>くステージの<ruby>先<rt>さき</rt></ruby>で<ruby>待<rt>ま</rt></ruby>ち<ruby>構<rt>かま</rt></ruby>える<ruby>敵<rt>てき</rt></ruby>に<ruby>向<rt>む</rt></ruby>かって<ruby>最後<rt>さいご</rt></ruby>まで<ruby>挑<rt>いど</rt></ruby>み<ruby>続<rt>つづ</rt></ruby>ける' },
    { ja: '長い文章を正確に打ち切るためには焦らず流れをつかんで入力することが大切', ro: 'nagaibunsyouwoseikakuniutikirutamenihaaserazunagarewotukandenyuuryokusurukotogataisetu', ruby: '<ruby>長<rt>なが</rt></ruby>い<ruby>文章<rt>ぶんしょう</rt></ruby>を<ruby>正確<rt>せいかく</rt></ruby>に<ruby>打<rt>う</rt></ruby>ち<ruby>切<rt>き</rt></ruby>るためには<ruby>焦<rt>あせ</rt></ruby>らず<ruby>流<rt>なが</rt></ruby>れをつかんで<ruby>入力<rt>にゅうりょく</rt></ruby>することが<ruby>大切<rt>たいせつ</rt></ruby>' },
    { ja: 'タイムバーがほとんど残っていなくても諦めなければ逆転できる瞬間がある', ro: 'taimuba-gahotondonokotteinakutemoakiramenakerebagyakutendekirusyunkangaaru', ruby: 'タイムバーがほとんど<ruby>残<rt>のこ</rt></ruby>っていなくても<ruby>諦<rt>あきら</rt></ruby>めなければ<ruby>逆転<rt>ぎゃくてん</rt></ruby>できる<ruby>瞬間<rt>しゅんかん</rt></ruby>がある' },
    { ja: '指先の感覚だけに頼らず画面のお題を最後までよく見て正しく入力する', ro: 'yubisakinokankakudakenitayorazugamennoodaiwosaigomadeyokumitetadasikunyuuryokusuru', ruby: '<ruby>指先<rt>ゆびさき</rt></ruby>の<ruby>感覚<rt>かんかく</rt></ruby>だけに<ruby>頼<rt>たよ</rt></ruby>らず<ruby>画面<rt>がめん</rt></ruby>のお<ruby>題<rt>だい</rt></ruby>を<ruby>最後<rt>さいご</rt></ruby>までよく<ruby>見<rt>み</rt></ruby>て<ruby>正<rt>ただ</rt></ruby>しく<ruby>入力<rt>にゅうりょく</rt></ruby>する' },
    { ja: '敵の圧力に負けそうになっても一文字ずつ積み重ねれば必ず道は開ける', ro: 'tekinoaturyokunimakesouninattemoitimozizututumikasanerebakanarazumitihahirakeru', ruby: '<ruby>敵<rt>てき</rt></ruby>の<ruby>圧力<rt>あつりょく</rt></ruby>に<ruby>負<rt>ま</rt></ruby>けそうになっても<ruby>一文字<rt>いちもじ</rt></ruby>ずつ<ruby>積<rt>つ</rt></ruby>み<ruby>重<rt>かさ</rt></ruby>ねれば<ruby>必<rt>かなら</rt></ruby>ず<ruby>道<rt>みち</rt></ruby>は<ruby>開<rt>ひら</rt></ruby>ける' },
    { ja: '長い挑戦の中で何度も失敗してもそのたびに少しずつ上手くなっていく', ro: 'nagaityousennonakadenandomosippaisitemosonotabinisukosizutuumakunatteiku', ruby: '<ruby>長<rt>なが</rt></ruby>い<ruby>挑戦<rt>ちょうせん</rt></ruby>の<ruby>中<rt>なか</rt></ruby>で<ruby>何度<rt>なんど</rt></ruby>も<ruby>失敗<rt>しっぱい</rt></ruby>してもそのたびに<ruby>少<rt>すこ</rt></ruby>しずつ<ruby>上手<rt>うま</rt></ruby>くなっていく' },
    { ja: 'このステージを突破できたならどんな長文にも落ち着いて向き合えるはずだ', ro: 'konosute-ziwotoppadekitanaradonnatyoubunnimootituitemukiaeruhazuda', ruby: 'このステージを<ruby>突破<rt>とっぱ</rt></ruby>できたならどんな<ruby>長文<rt>ちょうぶん</rt></ruby>にも<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて<ruby>向<rt>む</rt></ruby>き<ruby>合<rt>あ</rt></ruby>えるはずだ' },
    { ja: '最後の一文を打ち切るその瞬間まで集中を切らさず勝利をつかみ取ろう', ro: 'saigonoitibunwoutikirusonosyunkanmadesyuutyuuwokirasazusyouriwotukamitorou', ruby: '<ruby>最後<rt>さいご</rt></ruby>の<ruby>一文<rt>いちぶん</rt></ruby>を<ruby>打<rt>う</rt></ruby>ち<ruby>切<rt>き</rt></ruby>るその<ruby>瞬間<rt>しゅんかん</rt></ruby>まで<ruby>集中<rt>しゅうちゅう</rt></ruby>を<ruby>切<rt>き</rt></ruby>らさず<ruby>勝利<rt>しょうり</rt></ruby>をつかみ<ruby>取<rt>と</rt></ruby>ろう' },
    { ja: '画面に表示された長いお題を読み取りながら正確なリズムで入力を続ける', ro: 'gamennihyouzisaretanagaiodaiwoyomitorinagaraseikakunarizumudenyuuryokuwotudukeru', ruby: '<ruby>画面<rt>がめん</rt></ruby>に<ruby>表示<rt>ひょうじ</rt></ruby>された<ruby>長<rt>なが</rt></ruby>いお<ruby>題<rt>だい</rt></ruby>を<ruby>読<rt>よ</rt></ruby>み<ruby>取<rt>と</rt></ruby>りながら<ruby>正確<rt>せいかく</rt></ruby>なリズムで<ruby>入力<rt>にゅうりょく</rt></ruby>を<ruby>続<rt>つづ</rt></ruby>ける' },
    { ja: '限界に近い難しさでも落ち着いて進めば少しずつクリアに近づいていく', ro: 'genkainitikaimuzukasisademootituitesusumebasukosizutukurianitikaduiteiku', ruby: '<ruby>限界<rt>げんかい</rt></ruby>に<ruby>近<rt>ちか</rt></ruby>い<ruby>難<rt>むずか</rt></ruby>しさでも<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて<ruby>進<rt>すす</rt></ruby>めば<ruby>少<rt>すこ</rt></ruby>しずつクリアに<ruby>近<rt>ちか</rt></ruby>づいていく' },
  ],
};

const TIER_DEFS = [
  { id: 'rookie',  label: 'Rookie',  levels: [1, 2, 3],    desc: 'やさしい文でウォームアップ！' },
  { id: 'fighter', label: 'Fighter', levels: [4, 5, 6],    desc: '少し長めの文に挑戦！' },
  { id: 'veteran', label: 'Veteran', levels: [7, 8, 9],    desc: '歯ごたえのある長文！' },
  { id: 'elite',   label: 'Elite',   levels: [10, 11, 12], desc: '上級者向けの難文！' },
  { id: 'legend',  label: 'Legend',  levels: [13, 14, 15], desc: '最高難度に挑め！' },
];

const MODE_DESCRIPTIONS = {
  rookie:  'やさしい文でウォームアップ！',
  fighter: '少し長めの文に挑戦！',
  veteran: '歯ごたえのある長文！',
  elite:   '上級者向けの難文！',
  legend:  '最高難度に挑め！',
};

const RESULT_MESSAGES = [
  { threshold: 0,  text: 'まだまだこれから！練習あるのみ！' },
  { threshold: 6,  text: 'いい感じ！もっと速くなれる！' },
  { threshold: 13, text: 'すごい！タイピングが上手だね！' },
  { threshold: 21, text: '爆速！本物のタイピストだ！' },
  { threshold: 31, text: '伝説級！人間じゃないかも！？' }
];

const ROMAJI_ALTERNATES = [
  ['si', 'shi'],
  ['sya', 'sha'],
  ['syu', 'shu'],
  ['syo', 'sho'],
  ['tu', 'tsu'],
  ['ti', 'chi'],
  ['tya', 'cha'],
  ['hu', 'fu'],
  ['zi', 'ji'],
  ['ja', 'jya'],
  ['ju', 'jyu'],
  ['jo', 'jyo'],
  ['ltu', 'xtu'],  // っ を直接入力する方法 (ltu / xtu)
  ['lya', 'xya'],  // ゃ
  ['lyu', 'xyu'],  // ゅ
  ['lyo', 'xyo'],  // ょ
  ['di', 'dji'],   // ぢ
  ['du', 'dzu'],   // づ
];

function generateAlternates(ro) {
  const variants = new Set([ro]);
  for (const [a, b] of ROMAJI_ALTERNATES) {
    for (const v of [...variants]) {
      if (v.includes(a)) variants.add(v.replace(new RegExp(a, 'g'), b));
      if (v.includes(b)) variants.add(v.replace(new RegExp(b, 'g'), a));
    }
  }
  // ん を "nn" でも入力できるバリアントを生成（各ん位置を独立に展開）
  // 対象: 子音前・語末 の n、および n+母音（の/な/に等）の直前の n
  const base = [...variants];
  for (const v of base) {
    const positions = [];
    for (let i = 0; i < v.length; i++) {
      if (v[i] !== 'n') continue;
      const nxt  = v[i + 1];
      const nxt2 = v[i + 2];
      const standardCase  = nxt === undefined || !/[aeiouyn]/.test(nxt);
      const beforeNVowel  = nxt === 'n' && nxt2 !== undefined && /[aeiou]/.test(nxt2);
      if (standardCase || beforeNVowel) positions.push(i);
    }
    if (positions.length === 0) continue;
    for (let mask = 1; mask < (1 << positions.length); mask++) {
      let s = v;
      let offset = 0;
      for (let b = 0; b < positions.length; b++) {
        if (mask & (1 << b)) {
          const pos = positions[b] + offset;
          s = s.slice(0, pos) + 'nn' + s.slice(pos + 1);
          offset++;
        }
      }
      variants.add(s);
    }
  }
  return [...variants];
}

const GAME_DURATION = 60;
const WARNING_THRESHOLD = 10;
const CORRECT_ANIM_MS = 280; // style.css の anim-correct (0.28s) と対応

const BATTLE_MAX_HP        = 100;
const BATTLE_DAMAGE_PLAYER = 5;
const SLIME_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="slimeGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#8de4ff"/>
      <stop offset="50%"  stop-color="#2299ee"/>
      <stop offset="100%" stop-color="#0c54a8"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="93" rx="34" ry="5" fill="rgba(0,0,0,0.22)"/>
  <path d="M60 7 C76 7,104 23,104 51 C104 70,89 86,60 86 C31 86,16 70,16 51 C16 23,44 7,60 7 Z" fill="url(#slimeGrad)"/>
  <path d="M60 7 C76 7,104 23,104 51 C104 70,89 86,60 86 C31 86,16 70,16 51 C16 23,44 7,60 7 Z" fill="none" stroke="#094185" stroke-width="2.5"/>
  <ellipse cx="37" cy="26" rx="16" ry="8" fill="rgba(255,255,255,0.45)" transform="rotate(-25,37,26)"/>
  <ellipse cx="42" cy="53" rx="9" ry="10" fill="white"/>
  <ellipse cx="78" cy="53" rx="9" ry="10" fill="white"/>
  <circle cx="44" cy="55" r="5.5" fill="#1a1a1a"/>
  <circle cx="80" cy="55" r="5.5" fill="#1a1a1a"/>
  <circle cx="48" cy="51" r="2" fill="white"/>
  <circle cx="84" cy="51" r="2" fill="white"/>
  <path d="M43 68 Q60 78 77 68" stroke="#094185" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>`;
const GOBLIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="gobGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#90ee60"/>
      <stop offset="50%"  stop-color="#4caf20"/>
      <stop offset="100%" stop-color="#1a6000"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="93" rx="26" ry="4" fill="rgba(0,0,0,0.22)"/>
  <ellipse cx="60" cy="74" rx="16" ry="16" fill="url(#gobGrad)" stroke="#0d3d00" stroke-width="2"/>
  <ellipse cx="60" cy="50" rx="22" ry="20" fill="url(#gobGrad)" stroke="#0d3d00" stroke-width="2"/>
  <polygon points="37,46 25,30 40,40" fill="#4caf20" stroke="#0d3d00" stroke-width="1.5"/>
  <polygon points="83,46 95,30 80,40" fill="#4caf20" stroke="#0d3d00" stroke-width="1.5"/>
  <ellipse cx="51" cy="47" rx="7" ry="6.5" fill="#ffe000"/>
  <ellipse cx="69" cy="47" rx="7" ry="6.5" fill="#ffe000"/>
  <circle cx="52" cy="48" r="4.5" fill="#111"/>
  <circle cx="70" cy="48" r="4.5" fill="#111"/>
  <circle cx="54" cy="46" r="1.5" fill="white"/>
  <circle cx="72" cy="46" r="1.5" fill="white"/>
  <circle cx="57" cy="57" r="2" fill="#0d3d00"/>
  <circle cx="63" cy="57" r="2" fill="#0d3d00"/>
  <path d="M48 64 Q60 72 72 64" stroke="#0d3d00" stroke-width="2" fill="none"/>
  <rect x="53" y="64" width="3" height="6" rx="1" fill="white"/>
  <rect x="64" y="64" width="3" height="6" rx="1" fill="white"/>
  <ellipse cx="42" cy="34" rx="13" ry="6" fill="rgba(255,255,255,0.3)" transform="rotate(-20,42,34)"/>
</svg>`;

const GOLEM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="golGrad" cx="35%" cy="25%" r="70%">
      <stop offset="0%"   stop-color="#c8c0b0"/>
      <stop offset="50%"  stop-color="#857a6a"/>
      <stop offset="100%" stop-color="#3c3228"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="38" ry="5" fill="rgba(0,0,0,0.28)"/>
  <rect x="6"  y="52" width="24" height="32" rx="6" fill="url(#golGrad)" stroke="#1a1408" stroke-width="2"/>
  <rect x="90" y="52" width="24" height="32" rx="6" fill="url(#golGrad)" stroke="#1a1408" stroke-width="2"/>
  <ellipse cx="18"  cy="86" rx="12" ry="9" fill="url(#golGrad)" stroke="#1a1408" stroke-width="2"/>
  <ellipse cx="102" cy="86" rx="12" ry="9" fill="url(#golGrad)" stroke="#1a1408" stroke-width="2"/>
  <rect x="28" y="56" width="64" height="38" rx="6" fill="url(#golGrad)" stroke="#1a1408" stroke-width="2.5"/>
  <rect x="30" y="20" width="60" height="44" rx="8" fill="url(#golGrad)" stroke="#1a1408" stroke-width="2.5"/>
  <path d="M57 22 L53 52" stroke="#1a1408" stroke-width="2" opacity="0.5"/>
  <ellipse cx="46" cy="38" rx="8" ry="7" fill="#ff7700"/>
  <ellipse cx="74" cy="38" rx="8" ry="7" fill="#ff7700"/>
  <ellipse cx="46" cy="38" rx="5" ry="4.5" fill="#ffcc00"/>
  <ellipse cx="74" cy="38" rx="5" ry="4.5" fill="#ffcc00"/>
  <rect x="43" y="54" width="34" height="5" rx="2.5" fill="#1a1408"/>
  <path d="M35 68 Q60 62 85 68" stroke="#1a1408" stroke-width="1" opacity="0.35" fill="none"/>
  <path d="M32 80 Q60 74 88 80" stroke="#1a1408" stroke-width="1" opacity="0.35" fill="none"/>
</svg>`;

const DRAGON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="drgGrad" cx="38%" cy="28%" r="70%">
      <stop offset="0%"   stop-color="#ff7755"/>
      <stop offset="50%"  stop-color="#cc2200"/>
      <stop offset="100%" stop-color="#5a0800"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="30" ry="4" fill="rgba(0,0,0,0.25)"/>
  <path d="M58 46 L8 12 L22 52 Z" fill="#7a1100" stroke="#3d0800" stroke-width="1.5"/>
  <path d="M62 46 L112 12 L98 52 Z" fill="#7a1100" stroke="#3d0800" stroke-width="1.5"/>
  <path d="M58 46 L14 18" stroke="#3d0800" stroke-width="1" opacity="0.6"/>
  <path d="M58 46 L10 32" stroke="#3d0800" stroke-width="1" opacity="0.6"/>
  <path d="M62 46 L106 18" stroke="#3d0800" stroke-width="1" opacity="0.6"/>
  <path d="M62 46 L110 32" stroke="#3d0800" stroke-width="1" opacity="0.6"/>
  <ellipse cx="60" cy="76" rx="22" ry="18" fill="url(#drgGrad)" stroke="#3d0800" stroke-width="2"/>
  <path d="M50 62 Q56 48 60 40 Q64 48 70 62 Q64 58 56 58Z" fill="url(#drgGrad)" stroke="#3d0800" stroke-width="1.5"/>
  <ellipse cx="60" cy="34" rx="20" ry="14" fill="url(#drgGrad)" stroke="#3d0800" stroke-width="2.5"/>
  <ellipse cx="60" cy="41" rx="10" ry="7" fill="url(#drgGrad)" stroke="#3d0800" stroke-width="1.5"/>
  <polygon points="48,24 41,6 52,22" fill="#3d0800"/>
  <polygon points="72,24 79,6 68,22" fill="#3d0800"/>
  <ellipse cx="50" cy="30" rx="6" ry="5.5" fill="#ffe000"/>
  <ellipse cx="70" cy="30" rx="6" ry="5.5" fill="#ffe000"/>
  <ellipse cx="51" cy="30" rx="3.5" ry="4" fill="#111"/>
  <ellipse cx="71" cy="30" rx="3.5" ry="4" fill="#111"/>
  <circle cx="52" cy="28" r="1.5" fill="white"/>
  <circle cx="72" cy="28" r="1.5" fill="white"/>
  <circle cx="55" cy="42" r="2" fill="#3d0800"/>
  <circle cx="65" cy="42" r="2" fill="#3d0800"/>
  <path d="M51 44 L53 49 L55 44" fill="white" stroke="#3d0800" stroke-width="0.5"/>
  <path d="M65 44 L67 49 L69 44" fill="white" stroke="#3d0800" stroke-width="0.5"/>
</svg>`;

const PHOENIX_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="phxGrad" cx="50%" cy="35%" r="65%">
      <stop offset="0%"   stop-color="#fff176"/>
      <stop offset="40%"  stop-color="#ff9800"/>
      <stop offset="100%" stop-color="#dd2200"/>
    </radialGradient>
    <radialGradient id="phxWing" cx="50%" cy="50%" r="80%">
      <stop offset="0%"   stop-color="#ff9800"/>
      <stop offset="100%" stop-color="#bb2000"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="26" ry="4" fill="rgba(0,0,0,0.2)"/>
  <path d="M60 80 Q44 90 32 100 Q48 86 55 77" fill="#ff6600" opacity="0.85"/>
  <path d="M60 80 Q60 92 58 100 Q62 88 65 78" fill="#ffaa00" opacity="0.9"/>
  <path d="M60 80 Q76 90 88 100 Q72 86 65 77" fill="#ff6600" opacity="0.85"/>
  <path d="M52 55 Q28 38 6 45 Q22 52 42 62 Z" fill="url(#phxWing)" stroke="#992200" stroke-width="1.5"/>
  <path d="M68 55 Q92 38 114 45 Q98 52 78 62 Z" fill="url(#phxWing)" stroke="#992200" stroke-width="1.5"/>
  <path d="M42 62 Q30 50 12 48" stroke="#cc4400" stroke-width="1" fill="none" opacity="0.6"/>
  <path d="M78 62 Q90 50 108 48" stroke="#cc4400" stroke-width="1" fill="none" opacity="0.6"/>
  <ellipse cx="60" cy="66" rx="18" ry="16" fill="url(#phxGrad)" stroke="#992200" stroke-width="2"/>
  <ellipse cx="60" cy="50" rx="9"  ry="7"  fill="url(#phxGrad)" stroke="#992200" stroke-width="1.5"/>
  <ellipse cx="60" cy="38" rx="16" ry="14" fill="url(#phxGrad)" stroke="#992200" stroke-width="2"/>
  <path d="M50 28 Q48 14 52 10 Q54 22 55 28" fill="#ffcc00" stroke="#cc8800" stroke-width="1"/>
  <path d="M60 26 Q60 10 62  7 Q64 18 65 26" fill="#ff9800" stroke="#cc6600" stroke-width="1"/>
  <path d="M70 28 Q72 14 68 10 Q66 22 65 28" fill="#ffcc00" stroke="#cc8800" stroke-width="1"/>
  <ellipse cx="52" cy="36" rx="5" ry="5" fill="white"/>
  <ellipse cx="68" cy="36" rx="5" ry="5" fill="white"/>
  <circle cx="52" cy="36" r="3.5" fill="#cc0000"/>
  <circle cx="68" cy="36" r="3.5" fill="#cc0000"/>
  <circle cx="53" cy="35" r="1.5" fill="white"/>
  <circle cx="69" cy="35" r="1.5" fill="white"/>
  <path d="M53 43 L60 49 L67 43" fill="#ff9800" stroke="#993300" stroke-width="1.5"/>
</svg>`;

const MAOU_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="maoGrad" cx="38%" cy="28%" r="70%">
      <stop offset="0%"   stop-color="#9b49b0"/>
      <stop offset="50%"  stop-color="#5a0080"/>
      <stop offset="100%" stop-color="#1a0028"/>
    </radialGradient>
    <radialGradient id="maoEye" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#ff6600"/>
      <stop offset="100%" stop-color="#aa0000"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="34" ry="5" fill="rgba(60,0,80,0.4)"/>
  <path d="M26 96 L34 56 Q60 50 86 56 L94 96 Z" fill="#1a0028" stroke="#3a0050" stroke-width="1.5"/>
  <path d="M34 56 Q48 66 60 64 Q72 66 86 56 Q72 52 60 50 Q48 52 34 56Z" fill="#3a0050"/>
  <ellipse cx="60" cy="36" rx="30" ry="26" fill="rgba(80,0,120,0.18)"/>
  <ellipse cx="60" cy="36" rx="24" ry="22" fill="url(#maoGrad)" stroke="#3a0050" stroke-width="2.5"/>
  <path d="M42 22 Q36 6 42 2 Q46 14 48 20" fill="#2a0040" stroke="#1a0028" stroke-width="2"/>
  <path d="M78 22 Q84 6 78 2 Q74 14 72 20" fill="#2a0040" stroke="#1a0028" stroke-width="2"/>
  <path d="M43 20 Q39 10 42 4" stroke="#6a00a0" stroke-width="1" fill="none"/>
  <path d="M77 20 Q81 10 78 4" stroke="#6a00a0" stroke-width="1" fill="none"/>
  <ellipse cx="48" cy="34" rx="10" ry="9" fill="rgba(255,80,0,0.25)"/>
  <ellipse cx="72" cy="34" rx="10" ry="9" fill="rgba(255,80,0,0.25)"/>
  <ellipse cx="48" cy="34" rx="7" ry="6" fill="url(#maoEye)"/>
  <ellipse cx="72" cy="34" rx="7" ry="6" fill="url(#maoEye)"/>
  <ellipse cx="48" cy="34" rx="4" ry="3.5" fill="#ff8800"/>
  <ellipse cx="72" cy="34" rx="4" ry="3.5" fill="#ff8800"/>
  <path d="M56 44 L58 48 L62 48 L64 44" stroke="#3a0050" stroke-width="1.5" fill="none"/>
  <path d="M46 52 Q60 63 74 52" stroke="#1a0028" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M50 53 L48 58" stroke="#c060e0" stroke-width="2" stroke-linecap="round"/>
  <path d="M70 53 L72 58" stroke="#c060e0" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="46" cy="24" rx="12" ry="6" fill="rgba(255,255,255,0.15)" transform="rotate(-20,46,24)"/>
</svg>`;

const SLIME_KING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="slkGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#ffe878"/>
      <stop offset="50%"  stop-color="#d49010"/>
      <stop offset="100%" stop-color="#7a5000"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="93" rx="34" ry="5" fill="rgba(0,0,0,0.22)"/>
  <polygon points="38,30 43,14 50,30" fill="#ffd700" stroke="#a07800" stroke-width="1.5"/>
  <polygon points="55,27 60,10 65,27" fill="#ffd700" stroke="#a07800" stroke-width="1.5"/>
  <polygon points="70,30 77,14 82,30" fill="#ffd700" stroke="#a07800" stroke-width="1.5"/>
  <rect x="36" y="28" width="48" height="8" rx="2" fill="#ffd700" stroke="#a07800" stroke-width="1.5"/>
  <circle cx="60" cy="18" r="3.5" fill="#ff4444"/>
  <circle cx="44" cy="24" r="2.5" fill="#4488ff"/>
  <circle cx="76" cy="24" r="2.5" fill="#44cc44"/>
  <path d="M60 10 C76 10,104 26,104 54 C104 73,89 88,60 88 C31 88,16 73,16 54 C16 26,44 10,60 10 Z" fill="url(#slkGrad)"/>
  <path d="M60 10 C76 10,104 26,104 54 C104 73,89 88,60 88 C31 88,16 73,16 54 C16 26,44 10,60 10 Z" fill="none" stroke="#7a5000" stroke-width="2.5"/>
  <ellipse cx="37" cy="38" rx="14" ry="7" fill="rgba(255,255,255,0.4)" transform="rotate(-25,37,38)"/>
  <ellipse cx="42" cy="57" rx="9" ry="10" fill="white"/>
  <ellipse cx="78" cy="57" rx="9" ry="10" fill="white"/>
  <circle cx="44" cy="59" r="5.5" fill="#1a1a1a"/>
  <circle cx="80" cy="59" r="5.5" fill="#1a1a1a"/>
  <circle cx="48" cy="55" r="2" fill="white"/>
  <circle cx="84" cy="55" r="2" fill="white"/>
  <path d="M43 72 Q60 82 77 72" stroke="#7a5000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>`;

const ORC_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="orcGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#88cc44"/>
      <stop offset="50%"  stop-color="#4a8a18"/>
      <stop offset="100%" stop-color="#1e4000"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="93" rx="36" ry="5" fill="rgba(0,0,0,0.28)"/>
  <ellipse cx="60" cy="78" rx="30" ry="16" fill="url(#orcGrad)" stroke="#1e4000" stroke-width="2"/>
  <ellipse cx="60" cy="48" rx="32" ry="28" fill="url(#orcGrad)" stroke="#1e4000" stroke-width="2.5"/>
  <path d="M30 40 Q60 30 90 40" stroke="#1e4000" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="46" cy="46" rx="8" ry="7" fill="#cc2200"/>
  <ellipse cx="74" cy="46" rx="8" ry="7" fill="#cc2200"/>
  <circle cx="47" cy="47" r="5" fill="#111"/>
  <circle cx="75" cy="47" r="5" fill="#111"/>
  <circle cx="49" cy="45" r="1.5" fill="white"/>
  <circle cx="77" cy="45" r="1.5" fill="white"/>
  <ellipse cx="60" cy="58" rx="10" ry="8" fill="#3a7010" stroke="#1e4000" stroke-width="1.5"/>
  <circle cx="55" cy="58" r="3" fill="#1e4000"/>
  <circle cx="65" cy="58" r="3" fill="#1e4000"/>
  <path d="M46 68 Q60 74 74 68" stroke="#1e4000" stroke-width="2" fill="none"/>
  <path d="M50 67 L47 80" stroke="#f0e0a0" stroke-width="5" stroke-linecap="round"/>
  <path d="M70 67 L73 80" stroke="#f0e0a0" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="42" cy="30" rx="14" ry="6" fill="rgba(255,255,255,0.25)" transform="rotate(-20,42,30)"/>
</svg>`;

const SKELETON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="skelGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#f0ece0"/>
      <stop offset="50%"  stop-color="#c8c0a8"/>
      <stop offset="100%" stop-color="#8a8070"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="26" ry="4" fill="rgba(0,0,0,0.2)"/>
  <line x1="60" y1="68" x2="60" y2="90" stroke="#c8c0a8" stroke-width="5"/>
  <path d="M60 72 Q44 76 40 86" stroke="#c8c0a8" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M60 72 Q76 76 80 86" stroke="#c8c0a8" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M60 80 Q42 84 38 92" stroke="#c8c0a8" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M60 80 Q78 84 82 92" stroke="#c8c0a8" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="44" rx="26" ry="28" fill="url(#skelGrad)" stroke="#8a8070" stroke-width="2.5"/>
  <path d="M36 60 Q60 74 84 60 L82 66 Q60 80 38 66 Z" fill="url(#skelGrad)" stroke="#8a8070" stroke-width="2"/>
  <ellipse cx="46" cy="42" rx="10" ry="11" fill="#1a1a1a"/>
  <ellipse cx="74" cy="42" rx="10" ry="11" fill="#1a1a1a"/>
  <ellipse cx="46" cy="42" rx="5.5" ry="6.5" fill="#22dd22" opacity="0.85"/>
  <ellipse cx="74" cy="42" rx="5.5" ry="6.5" fill="#22dd22" opacity="0.85"/>
  <path d="M56 52 L60 58 L64 52" fill="#1a1a1a"/>
  <rect x="46" y="63" width="5" height="8" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <rect x="54" y="63" width="5" height="8" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <rect x="62" y="63" width="5" height="8" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <rect x="70" y="63" width="5" height="8" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <ellipse cx="42" cy="28" rx="10" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(-20,42,28)"/>
</svg>`;

const TROLL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="trlGrad" cx="35%" cy="28%" r="70%">
      <stop offset="0%"   stop-color="#b0a0c8"/>
      <stop offset="50%"  stop-color="#6a5888"/>
      <stop offset="100%" stop-color="#2e2040"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="40" ry="5" fill="rgba(0,0,0,0.28)"/>
  <ellipse cx="16" cy="68" rx="14" ry="20" fill="url(#trlGrad)" stroke="#2e2040" stroke-width="2"/>
  <ellipse cx="104" cy="68" rx="14" ry="20" fill="url(#trlGrad)" stroke="#2e2040" stroke-width="2"/>
  <ellipse cx="60" cy="76" rx="36" ry="20" fill="url(#trlGrad)" stroke="#2e2040" stroke-width="2.5"/>
  <ellipse cx="60" cy="46" rx="36" ry="32" fill="url(#trlGrad)" stroke="#2e2040" stroke-width="2.5"/>
  <circle cx="28" cy="52" r="5" fill="#5a4a70" stroke="#2e2040" stroke-width="1.5"/>
  <circle cx="90" cy="50" r="4" fill="#5a4a70" stroke="#2e2040" stroke-width="1.5"/>
  <circle cx="48" cy="26" r="3.5" fill="#5a4a70" stroke="#2e2040" stroke-width="1"/>
  <ellipse cx="46" cy="42" rx="8" ry="7" fill="#cc6600"/>
  <ellipse cx="74" cy="42" rx="8" ry="7" fill="#cc6600"/>
  <circle cx="47" cy="43" r="5" fill="#111"/>
  <circle cx="75" cy="43" r="5" fill="#111"/>
  <circle cx="49" cy="41" r="1.5" fill="white"/>
  <circle cx="77" cy="41" r="1.5" fill="white"/>
  <ellipse cx="60" cy="57" rx="14" ry="11" fill="#5a4878" stroke="#2e2040" stroke-width="1.5"/>
  <circle cx="54" cy="58" r="5" fill="#2e2040"/>
  <circle cx="66" cy="58" r="5" fill="#2e2040"/>
  <path d="M40 68 Q60 78 80 68" stroke="#2e2040" stroke-width="3" fill="none"/>
  <rect x="49" y="67" width="6" height="9" rx="2" fill="#f0e8c0"/>
  <rect x="65" y="67" width="6" height="9" rx="2" fill="#f0e8c0"/>
  <ellipse cx="40" cy="30" rx="14" ry="6" fill="rgba(255,255,255,0.2)" transform="rotate(-20,40,30)"/>
</svg>`;

const MINOTAUR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="minGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#a06040"/>
      <stop offset="50%"  stop-color="#603820"/>
      <stop offset="100%" stop-color="#2a1208"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="34" ry="5" fill="rgba(0,0,0,0.3)"/>
  <path d="M34 34 Q16 10 22 4 Q28 18 38 28" fill="#2a1208" stroke="#1a0a04" stroke-width="2"/>
  <path d="M86 34 Q104 10 98 4 Q92 18 82 28" fill="#2a1208" stroke="#1a0a04" stroke-width="2"/>
  <ellipse cx="24" cy="40" rx="11" ry="8" fill="url(#minGrad)" stroke="#2a1208" stroke-width="2" transform="rotate(-20,24,40)"/>
  <ellipse cx="96" cy="40" rx="11" ry="8" fill="url(#minGrad)" stroke="#2a1208" stroke-width="2" transform="rotate(20,96,40)"/>
  <ellipse cx="60" cy="74" rx="24" ry="18" fill="url(#minGrad)" stroke="#2a1208" stroke-width="2"/>
  <ellipse cx="60" cy="46" rx="28" ry="26" fill="url(#minGrad)" stroke="#2a1208" stroke-width="2.5"/>
  <ellipse cx="60" cy="62" rx="16" ry="12" fill="#4a2810" stroke="#2a1208" stroke-width="2"/>
  <circle cx="54" cy="62" r="4.5" fill="#1a0a04"/>
  <circle cx="66" cy="62" r="4.5" fill="#1a0a04"/>
  <ellipse cx="46" cy="42" rx="8" ry="7" fill="#cc4400"/>
  <ellipse cx="74" cy="42" rx="8" ry="7" fill="#cc4400"/>
  <circle cx="47" cy="43" r="5" fill="#111"/>
  <circle cx="75" cy="43" r="5" fill="#111"/>
  <circle cx="49" cy="41" r="1.5" fill="white"/>
  <circle cx="77" cy="41" r="1.5" fill="white"/>
  <ellipse cx="60" cy="70" rx="7" ry="4" fill="none" stroke="#c0a000" stroke-width="3.5"/>
  <path d="M48 72 Q60 78 72 72" stroke="#1a0a04" stroke-width="2.5" fill="none"/>
  <ellipse cx="42" cy="28" rx="12" ry="5" fill="rgba(255,255,255,0.2)" transform="rotate(-25,42,28)"/>
</svg>`;

const MEDUSA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="medGrad" cx="40%" cy="32%" r="70%">
      <stop offset="0%"   stop-color="#90d8a0"/>
      <stop offset="50%"  stop-color="#3a9050"/>
      <stop offset="100%" stop-color="#0a4020"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="26" ry="4" fill="rgba(0,0,0,0.2)"/>
  <path d="M40 30 Q22 18 20 6" stroke="#2a8040" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M48 24 Q38 10 40 2" stroke="#44aa55" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M58 20 Q54 6 58 2" stroke="#2a8040" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M70 22 Q72 8 78 4" stroke="#44aa55" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M78 28 Q92 16 94 6" stroke="#2a8040" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="20" cy="6" r="5" fill="#1a6030" stroke="#0a4020" stroke-width="1.5"/>
  <circle cx="40" cy="2" r="5" fill="#2a8040" stroke="#0a4020" stroke-width="1.5"/>
  <circle cx="58" cy="2" r="5" fill="#1a6030" stroke="#0a4020" stroke-width="1.5"/>
  <circle cx="78" cy="4" r="5" fill="#2a8040" stroke="#0a4020" stroke-width="1.5"/>
  <circle cx="94" cy="6" r="5" fill="#1a6030" stroke="#0a4020" stroke-width="1.5"/>
  <ellipse cx="60" cy="58" rx="22" ry="24" fill="url(#medGrad)" stroke="#0a4020" stroke-width="2.5"/>
  <ellipse cx="48" cy="54" rx="8" ry="7" fill="#ffd700"/>
  <ellipse cx="72" cy="54" rx="8" ry="7" fill="#ffd700"/>
  <ellipse cx="48" cy="54" rx="2.5" ry="6" fill="#111"/>
  <ellipse cx="72" cy="54" rx="2.5" ry="6" fill="#111"/>
  <circle cx="57" cy="64" r="2" fill="#0a4020"/>
  <circle cx="63" cy="64" r="2" fill="#0a4020"/>
  <path d="M46 70 Q60 78 74 70" stroke="#0a4020" stroke-width="2" fill="none"/>
  <path d="M60 74 L56 82 M60 74 L64 82" stroke="#ff4444" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="42" cy="42" rx="10" ry="5" fill="rgba(255,255,255,0.25)" transform="rotate(-20,42,42)"/>
</svg>`;

const CHIMERA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="chiGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#e08050"/>
      <stop offset="50%"  stop-color="#a04820"/>
      <stop offset="100%" stop-color="#4a1a00"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="93" rx="34" ry="5" fill="rgba(0,0,0,0.28)"/>
  <path d="M44 42 Q16 22 8 36 Q24 46 44 54 Z" fill="#602000" stroke="#2a1000" stroke-width="1.5"/>
  <path d="M76 42 Q104 22 112 36 Q96 46 76 54 Z" fill="#602000" stroke="#2a1000" stroke-width="1.5"/>
  <path d="M44 42 Q22 28 14 34" stroke="#4a2000" stroke-width="1" fill="none" opacity="0.7"/>
  <path d="M44 42 Q26 32 18 38" stroke="#4a2000" stroke-width="1" fill="none" opacity="0.7"/>
  <path d="M76 42 Q98 28 106 34" stroke="#4a2000" stroke-width="1" fill="none" opacity="0.7"/>
  <path d="M76 42 Q94 32 102 38" stroke="#4a2000" stroke-width="1" fill="none" opacity="0.7"/>
  <ellipse cx="60" cy="42" rx="36" ry="30" fill="#cc7020" stroke="#4a1a00" stroke-width="2"/>
  <ellipse cx="60" cy="44" rx="26" ry="24" fill="url(#chiGrad)" stroke="#4a1a00" stroke-width="2.5"/>
  <polygon points="34,34 28,16 42,32" fill="#cc7020" stroke="#4a1a00" stroke-width="1.5"/>
  <polygon points="86,34 92,16 78,32" fill="#cc7020" stroke="#4a1a00" stroke-width="1.5"/>
  <ellipse cx="47" cy="42" rx="8" ry="7.5" fill="#ffd700"/>
  <ellipse cx="73" cy="42" rx="8" ry="7.5" fill="#ffd700"/>
  <circle cx="48" cy="43" r="5" fill="#111"/>
  <circle cx="74" cy="43" r="5" fill="#111"/>
  <circle cx="50" cy="41" r="1.5" fill="white"/>
  <circle cx="76" cy="41" r="1.5" fill="white"/>
  <ellipse cx="60" cy="57" rx="12" ry="9" fill="#b05520" stroke="#4a1a00" stroke-width="1.5"/>
  <circle cx="55" cy="57" r="3.5" fill="#4a1a00"/>
  <circle cx="65" cy="57" r="3.5" fill="#4a1a00"/>
  <path d="M48 64 Q60 72 72 64" stroke="#4a1a00" stroke-width="2" fill="none"/>
  <path d="M54 65 L52 73" stroke="white" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M68 65 L70 73" stroke="white" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M80 84 Q92 78 96 86 Q98 92 94 94" stroke="#228840" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="38" cy="28" rx="12" ry="6" fill="rgba(255,255,255,0.2)" transform="rotate(-20,38,28)"/>
</svg>`;

const WYVERN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="wyvGrad" cx="38%" cy="28%" r="70%">
      <stop offset="0%"   stop-color="#7060a0"/>
      <stop offset="50%"  stop-color="#3a2070"/>
      <stop offset="100%" stop-color="#100028"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="28" ry="4" fill="rgba(0,0,0,0.3)"/>
  <path d="M48 40 L4 10 L20 52 Z" fill="#200858" stroke="#100028" stroke-width="1.5"/>
  <path d="M72 40 L116 10 L100 52 Z" fill="#200858" stroke="#100028" stroke-width="1.5"/>
  <path d="M48 40 L8 16" stroke="#100028" stroke-width="1" opacity="0.7"/>
  <path d="M48 40 L10 28" stroke="#100028" stroke-width="1" opacity="0.7"/>
  <path d="M48 40 L6 42" stroke="#100028" stroke-width="1" opacity="0.7"/>
  <path d="M72 40 L112 16" stroke="#100028" stroke-width="1" opacity="0.7"/>
  <path d="M72 40 L110 28" stroke="#100028" stroke-width="1" opacity="0.7"/>
  <path d="M72 40 L114 42" stroke="#100028" stroke-width="1" opacity="0.7"/>
  <path d="M62 72 Q80 80 90 76 Q94 86 88 90" stroke="#3a2070" stroke-width="6" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="68" rx="20" ry="14" fill="url(#wyvGrad)" stroke="#100028" stroke-width="2"/>
  <ellipse cx="60" cy="42" rx="22" ry="18" fill="url(#wyvGrad)" stroke="#100028" stroke-width="2.5"/>
  <path d="M44 30 Q36 14 40 6 Q44 18 48 28" fill="#100028" stroke="#060010" stroke-width="1"/>
  <path d="M76 30 Q84 14 80 6 Q76 18 72 28" fill="#100028" stroke="#060010" stroke-width="1"/>
  <ellipse cx="48" cy="40" rx="7" ry="6" fill="#ff4400"/>
  <ellipse cx="72" cy="40" rx="7" ry="6" fill="#ff4400"/>
  <ellipse cx="48" cy="40" rx="3.5" ry="5" fill="#111"/>
  <ellipse cx="72" cy="40" rx="3.5" ry="5" fill="#111"/>
  <path d="M50 50 Q60 56 70 50 L68 58 Q60 62 52 58 Z" fill="#3a2070" stroke="#100028" stroke-width="1.5"/>
  <path d="M54 57 L52 66" stroke="#f0e8d0" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M66 57 L68 66" stroke="#f0e8d0" stroke-width="2.5" stroke-linecap="round"/>
  <ellipse cx="44" cy="28" rx="10" ry="5" fill="rgba(255,255,255,0.15)" transform="rotate(-25,44,28)"/>
</svg>`;

const LICH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="licGrad" cx="38%" cy="28%" r="70%">
      <stop offset="0%"   stop-color="#e8e0d0"/>
      <stop offset="50%"  stop-color="#c8c0a8"/>
      <stop offset="100%" stop-color="#8a8070"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="28" ry="4" fill="rgba(20,0,40,0.4)"/>
  <path d="M28 68 Q22 86 26 96 Q60 88 94 96 Q98 86 92 68 Q76 74 60 74 Q44 74 28 68Z" fill="#1e0050" stroke="#100030" stroke-width="2"/>
  <line x1="60" y1="74" x2="60" y2="94" stroke="#2e0070" stroke-width="2"/>
  <path d="M28 68 Q14 60 10 72 Q18 80 28 74" fill="#1e0050" stroke="#100030" stroke-width="2"/>
  <path d="M92 68 Q106 60 110 72 Q102 80 92 74" fill="#1e0050" stroke="#100030" stroke-width="2"/>
  <path d="M10 72 L6 77 M10 72 L8 81 M10 72 L14 80" stroke="#c8c0a8" stroke-width="2" stroke-linecap="round"/>
  <path d="M110 72 L114 77 M110 72 L112 81 M110 72 L106 80" stroke="#c8c0a8" stroke-width="2" stroke-linecap="round"/>
  <rect x="52" y="56" width="16" height="16" rx="4" fill="#c8c0a8" stroke="#8a8070" stroke-width="1.5"/>
  <ellipse cx="60" cy="40" rx="26" ry="24" fill="url(#licGrad)" stroke="#8a8070" stroke-width="2.5"/>
  <polygon points="40,24 44,8 50,24" fill="#7700bb" stroke="#5500aa" stroke-width="1.5"/>
  <polygon points="56,21 60,4 64,21" fill="#9900ee" stroke="#7700cc" stroke-width="1.5"/>
  <polygon points="70,24 76,8 80,24" fill="#7700bb" stroke="#5500aa" stroke-width="1.5"/>
  <rect x="38" y="22" width="44" height="7" rx="2" fill="#8800cc" stroke="#6600bb" stroke-width="1.5"/>
  <circle cx="60" cy="12" r="3" fill="#ff0066"/>
  <circle cx="45" cy="18" r="2" fill="#0066ff"/>
  <circle cx="75" cy="18" r="2" fill="#00ff88"/>
  <ellipse cx="46" cy="40" rx="9" ry="10" fill="#111"/>
  <ellipse cx="74" cy="40" rx="9" ry="10" fill="#111"/>
  <ellipse cx="46" cy="40" rx="5" ry="6" fill="#aa00ff"/>
  <ellipse cx="74" cy="40" rx="5" ry="6" fill="#aa00ff"/>
  <path d="M56 50 L60 56 L64 50" fill="#111"/>
  <path d="M40 54 Q60 66 80 54" stroke="#8a8070" stroke-width="2" fill="none"/>
  <rect x="46" y="55" width="5" height="7" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <rect x="54" y="55" width="5" height="7" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <rect x="62" y="55" width="5" height="7" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <rect x="70" y="55" width="5" height="7" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
</svg>`;

const DEMON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="demGrad" cx="38%" cy="28%" r="70%">
      <stop offset="0%"   stop-color="#ff6040"/>
      <stop offset="50%"  stop-color="#cc1800"/>
      <stop offset="100%" stop-color="#500000"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="30" ry="5" fill="rgba(40,0,0,0.35)"/>
  <path d="M44 48 L6 18 L22 58 Z" fill="#660000" stroke="#300000" stroke-width="1.5"/>
  <path d="M76 48 L114 18 L98 58 Z" fill="#660000" stroke="#300000" stroke-width="1.5"/>
  <path d="M44 48 L10 24" stroke="#500000" stroke-width="1" opacity="0.7"/>
  <path d="M44 48 L8 36" stroke="#500000" stroke-width="1" opacity="0.7"/>
  <path d="M44 48 L8 48" stroke="#500000" stroke-width="1" opacity="0.7"/>
  <path d="M76 48 L110 24" stroke="#500000" stroke-width="1" opacity="0.7"/>
  <path d="M76 48 L112 36" stroke="#500000" stroke-width="1" opacity="0.7"/>
  <path d="M76 48 L112 48" stroke="#500000" stroke-width="1" opacity="0.7"/>
  <path d="M72 82 Q88 76 94 84 Q96 92 90 92 Q88 88 86 84 Q80 80 70 82" fill="#cc1800" stroke="#500000" stroke-width="1.5"/>
  <ellipse cx="60" cy="70" rx="22" ry="16" fill="url(#demGrad)" stroke="#500000" stroke-width="2"/>
  <ellipse cx="60" cy="44" rx="26" ry="24" fill="url(#demGrad)" stroke="#500000" stroke-width="2.5"/>
  <path d="M40 30 Q30 10 36 4 Q40 18 44 28" fill="#500000" stroke="#300000" stroke-width="1.5"/>
  <path d="M80 30 Q90 10 84 4 Q80 18 76 28" fill="#500000" stroke="#300000" stroke-width="1.5"/>
  <ellipse cx="47" cy="42" rx="9" ry="8" fill="#ffd700"/>
  <ellipse cx="73" cy="42" rx="9" ry="8" fill="#ffd700"/>
  <circle cx="48" cy="43" r="6" fill="#111"/>
  <circle cx="74" cy="43" r="6" fill="#111"/>
  <circle cx="50" cy="41" r="2" fill="white"/>
  <circle cx="76" cy="41" r="2" fill="white"/>
  <circle cx="56" cy="54" r="3.5" fill="#aa1400"/>
  <circle cx="64" cy="54" r="3.5" fill="#aa1400"/>
  <path d="M40 60 Q60 74 80 60" stroke="#500000" stroke-width="2.5" fill="none"/>
  <path d="M46 62 L44 70" stroke="#f0e8d0" stroke-width="3" stroke-linecap="round"/>
  <path d="M74 62 L76 70" stroke="#f0e8d0" stroke-width="3" stroke-linecap="round"/>
  <path d="M54 66 L52 74" stroke="#f0e8d0" stroke-width="2" stroke-linecap="round"/>
  <path d="M66 66 L68 74" stroke="#f0e8d0" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="42" cy="28" rx="12" ry="5" fill="rgba(255,255,255,0.2)" transform="rotate(-25,42,28)"/>
</svg>`;

const STAGE_ENEMIES = [
  { name: 'スライム',       emoji: SLIME_SVG      },
  { name: 'スライムキング', emoji: SLIME_KING_SVG  },
  { name: 'ゴブリン',       emoji: GOBLIN_SVG     },
  { name: 'オーク',         emoji: ORC_SVG        },
  { name: 'スケルトン',     emoji: SKELETON_SVG   },
  { name: 'トロール',       emoji: TROLL_SVG      },
  { name: 'ゴーレム',       emoji: GOLEM_SVG      },
  { name: 'ミノタウロス',   emoji: MINOTAUR_SVG   },
  { name: 'メデューサ',     emoji: MEDUSA_SVG     },
  { name: 'キメラ',         emoji: CHIMERA_SVG    },
  { name: 'ワイバーン',     emoji: WYVERN_SVG     },
  { name: 'ドラゴン',       emoji: DRAGON_SVG     },
  { name: 'リッチ',         emoji: LICH_SVG       },
  { name: 'デーモン',       emoji: DEMON_SVG      },
  { name: 'フェニックス',   emoji: PHOENIX_SVG    },
  { name: '魔王',           emoji: MAOU_SVG       },
];

function getStageData(stage) {
  const enemyIdx = Math.floor((stage - 1) / 5) % STAGE_ENEMIES.length;
  const template = STAGE_ENEMIES[enemyIdx];
  return {
    name:      template.name,
    emoji:     template.emoji,
    diffLevel: Math.min(15, Math.ceil(stage / 5)),
  };
}

function calcWordTimeLimit(roLength, diffLevel) {
  let seconds;
  if (diffLevel <= 3)       seconds = roLength * 0.325 + 3;
  else if (diffLevel <= 6)  seconds = roLength * 0.275 + 2.5;
  else if (diffLevel <= 9)  seconds = roLength * 0.24 + 2;
  else if (diffLevel <= 12) seconds = roLength * 0.21 + 1.5;
  else                      seconds = roLength * 0.18 + 1;
  return Math.max(4, Math.round(seconds));
}

const STAGE_STORAGE_KEY = 'typeRushBestStage';
function getBestStage() {
  try { return parseInt(localStorage.getItem(STAGE_STORAGE_KEY) || '0', 10); }
  catch { return 0; }
}
function setBestStage(stage) {
  try { localStorage.setItem(STAGE_STORAGE_KEY, String(stage)); }
  catch { /* ignore */ }
}

const BEST_SCORE_KEY = 'typeRushBestScore';
function getBestScore() {
  try { return parseInt(localStorage.getItem(BEST_SCORE_KEY) || '0', 10); }
  catch { return 0; }
}
function setBestScore(score) {
  try { localStorage.setItem(BEST_SCORE_KEY, String(score)); }
  catch { /* ignore */ }
}

let audioCtx = null;
const SOUND_KEY = 'typeRushSound';

function playSound(type) {
  if (!state.soundEnabled) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const ctx = audioCtx;
  const now = ctx.currentTime;

  if (type === 'key') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.start(now); osc.stop(now + 0.07);

  } else if (type === 'miss') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.value = 180;
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.start(now); osc.stop(now + 0.12);

  } else if (type === 'correct') {
    // 長三和音（ド・ミ・ソ）を時間差で鳴らして開放感を出す
    [[523, 0], [659, 0.06], [784, 0.12]].forEach(([freq, delay]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.18, now + delay + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.6);
      osc.start(now + delay); osc.stop(now + delay + 0.6);
    });
  }
}

// ================================
// State
// ================================
const state = {
  mode: 'rookie',
  gameType: 'battle',
  diffLevel: 1,
  score: 0,
  timeLeft: GAME_DURATION,
  wordTimeLimit: GAME_DURATION,
  currentWord: '',
  lastWord: '',
  currentWordAlts: [],
  currentStage: 1,
  playerHp: BATTLE_MAX_HP,
  combo: 0,
  isPlaying: false,
  timerId: null,
  barTimerId: null,
  barStartMs: 0,
  wordTimerId: null,
  countdownTimerId: null,
  countdownActive: false,
  soundEnabled: localStorage.getItem(SOUND_KEY) !== 'off',
  totalKeystrokes: 0,
  correctKeystrokes: 0,
  _insertPending: false,
  currentWordMissed: false
};

// ================================
// DOM References
// ================================
const screens = {
  start:  document.getElementById('screen-start'),
  game:   document.getElementById('screen-game'),
  pause:  document.getElementById('screen-pause'),
  result: document.getElementById('screen-result')
};

const el = {
  gametypeBtnGroup: document.querySelector('.gametype-selector'),
  modeSelector:     document.querySelector('.mode-selector'),
  modeButtonGroup:  document.querySelector('.mode-buttons'),
  modeDescription:  document.getElementById('mode-description'),
  startBtn:         document.getElementById('start-btn'),
  timerBar:         document.getElementById('timer-bar'),
  scoreBox:         document.getElementById('score-box'),
  scoreValue:       document.getElementById('score-value'),
  currentWordJa:    document.getElementById('current-word-ja'),
  currentWord:      document.getElementById('current-word'),
  typingInput:      document.getElementById('typing-input'),
  hpArea:           document.getElementById('hp-area'),
  playerHpBar:      document.getElementById('player-hp-bar'),
  playerHpValue:    document.getElementById('player-hp-value'),
  finalScoreValue:  document.getElementById('final-score-value'),
  resultStats:      document.getElementById('result-stats'),
  resultMessage:    document.getElementById('result-message'),
  bestScoreInfo:    document.getElementById('best-score-info'),
  battleResult:     document.getElementById('battle-result'),
  reachedStageInfo: document.getElementById('reached-stage-info'),
  bestStageInfo:    document.getElementById('best-stage-info'),
  battleHpSummary:  document.getElementById('battle-hp-summary'),
  enemyArea:        document.getElementById('enemy-area'),
  enemyEmoji:       document.getElementById('enemy-emoji'),
  enemyName:        document.getElementById('enemy-name'),
  stageIndicator:   document.getElementById('stage-indicator'),
  stageValue:       document.getElementById('stage-value'),
  diffLevelValue:   document.getElementById('diff-level-value'),
  battleExtras:     document.getElementById('battle-extras'),
  comboDisplay:     document.getElementById('combo-display'),
  countdownOverlay: document.getElementById('countdown-overlay'),
  countdownText:    document.getElementById('countdown-text'),
  battleFlash:      document.getElementById('battle-flash'),
  battleEndOverlay: document.getElementById('battle-end-overlay'),
  battleEndText:    document.getElementById('battle-end-text'),
  restartBtn:       document.getElementById('restart-btn'),
  soundBtn:         document.getElementById('sound-btn'),
  pauseBtn:         document.getElementById('pause-btn'),
  resumeBtn:        document.getElementById('resume-btn'),
  retryBtn:         document.getElementById('retry-btn'),
  homeBtn:          document.getElementById('home-btn'),
};

// ================================
// Screen Management
// ================================
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ================================
// Display Helpers
// ================================
function renderTimer() {
  if (state.gameType === 'battle') {
    const threshold = Math.max(3, Math.round(state.wordTimeLimit * 0.2));
    el.timerBar.classList.toggle('warning', state.timeLeft <= threshold);
    return;
  }
  el.timerBar.style.width = (state.timeLeft / GAME_DURATION * 100) + '%';
  el.timerBar.classList.toggle('warning', state.timeLeft <= WARNING_THRESHOLD);
}

function renderScore() {
  el.scoreValue.textContent = state.score;
}

function renderHp() {
  const p = Math.max(0, state.playerHp);
  el.playerHpBar.style.width   = Math.round(p / BATTLE_MAX_HP * 100) + '%';
  el.playerHpValue.textContent = p;
}

function renderCombo() {
  el.comboDisplay.textContent = state.combo >= 2 ? `🔥 ${state.combo} コンボ！` : '';
}

function triggerAnimation(element, className) {
  element.classList.remove(className);
  void element.offsetWidth; // DOMの再描画を強制してアニメーションをリセット
  element.classList.add(className);
}

function renderStage() {
  el.stageValue.textContent = state.currentStage;
}

function renderDiffLevel() {
  el.diffLevelValue.textContent = state.diffLevel;
}

function renderWordProgress(typed) {
  const target = state.currentWord;
  const html = target.split('').map((char, i) => {
    let cls = 'char-pending';
    if (i < typed.length) {
      cls = typed[i] === char ? 'char-correct' : 'char-wrong';
    }
    return `<span class="${cls}">${char}</span>`;
  }).join('');
  el.currentWord.innerHTML = html;
}

// ================================
// Word Logic
// ================================
function pickRandomWord() {
  let words;
  if (state.gameType === 'battle') {
    words = WORD_LISTS[state.diffLevel];
  } else {
    const tier = TIER_DEFS.find(t => t.id === state.mode);
    words = tier.levels.flatMap(l => WORD_LISTS[l]);
  }
  let word;
  do {
    word = words[Math.floor(Math.random() * words.length)];
  } while (word.ro === (state.currentWord || state.lastWord) && words.length > 1);
  return word;
}

function showNextWord() {
  const word = pickRandomWord();
  state.currentWord = word.ro;
  state.currentWordAlts = generateAlternates(word.ro);
  state.currentWordMissed = false;
  if (state.gameType === 'battle') {
    state.wordTimeLimit = calcWordTimeLimit(word.ro.length, state.diffLevel);
    state.timeLeft = state.wordTimeLimit;
    el.timerBar.style.width = '100%';
    el.timerBar.classList.remove('warning');
  }
  el.currentWordJa.innerHTML = word.ruby || word.ja;
  el.typingInput.value = '';
  renderWordProgress('');
  triggerAnimation(el.currentWord, 'anim-appear');
  triggerAnimation(el.currentWordJa, 'anim-appear');
}

function getResultMessage(score) {
  let message = RESULT_MESSAGES[0].text;
  for (const entry of RESULT_MESSAGES) {
    if (score >= entry.threshold) message = entry.text;
  }
  return message;
}

// ================================
// Timer Logic
// ================================
function tick() {
  state.timeLeft--;
  if (state.gameType === 'battle') state.barStartMs = Date.now();
  renderTimer();
  if (state.timeLeft <= 0) {
    endGame();
  }
}

function startTimer() {
  clearInterval(state.timerId);
  state.timerId = setInterval(tick, 1000);
  if (state.gameType === 'battle') {
    state.barStartMs = Date.now();
    clearInterval(state.barTimerId);
    state.barTimerId = setInterval(() => {
      const secsGone = (Date.now() - state.barStartMs) / 1000;
      const remaining = Math.max(0, state.timeLeft - secsGone);
      el.timerBar.style.width = (remaining / state.wordTimeLimit * 100) + '%';
    }, 50);
  }
}

function stopTimer() {
  clearInterval(state.timerId);
  state.timerId = null;
  clearInterval(state.barTimerId);
  state.barTimerId = null;
}

// ================================
// Game Flow
// ================================
function syncStartScreenUI() {
  el.modeSelector.style.display = state.gameType === 'normal' ? 'block' : 'none';
}

function updateGameUI() {
  const isBattle = state.gameType === 'battle';
  el.scoreBox.style.display       = isBattle ? 'none' : '';
  el.stageIndicator.style.display = isBattle ? 'block' : 'none';
  el.hpArea.style.display         = isBattle ? 'flex'  : 'none';
  el.enemyArea.style.display      = isBattle ? 'block' : 'none';
  el.battleExtras.style.display   = isBattle ? 'flex'  : 'none';
}

function startGame() {
  clearTimeout(state.wordTimerId);
  clearInterval(state.barTimerId);
  state.barTimerId = null;
  stopCountdown();
  state.score             = 0;
  state.currentStage      = 1;
  state.timeLeft          = GAME_DURATION;
  state.totalKeystrokes   = 0;
  state.correctKeystrokes = 0;
  el.timerBar.style.width = '100%';
  el.timerBar.style.transition = state.gameType === 'battle' ? 'none' : 'width 0.9s linear';

  updateGameUI();

  if (state.gameType === 'battle') {
    const stageData   = getStageData(state.currentStage);
    state.diffLevel   = stageData.diffLevel;
    state.playerHp    = BATTLE_MAX_HP;
    state.combo       = 0;
    el.enemyEmoji.innerHTML    = stageData.emoji;
    el.enemyName.textContent   = stageData.name;
    renderHp();
    renderCombo();
    renderStage();
    renderDiffLevel();
  }
  el.battleEndOverlay.style.display = 'none';

  renderTimer();
  renderScore();

  el.typingInput.value    = '';
  el.typingInput.disabled = true;

  showScreen('game');

  if (state.gameType === 'battle') {
    startCountdown();
  } else {
    state.isPlaying = true;
    el.typingInput.disabled = false;
    showNextWord();
    setTimeout(() => el.typingInput.focus(), 80);
    startTimer();
  }
}

function startCountdown() {
  state.countdownActive = true;
  el.countdownOverlay.style.display = 'flex';
  const steps = ['3', '2', '1', 'START!'];
  let i = 0;
  function next() {
    if (!state.countdownActive) return;
    el.countdownText.textContent = steps[i];
    el.countdownText.classList.toggle('start', steps[i] === 'START!');
    triggerAnimation(el.countdownText, 'anim-countdown');
    i++;
    state.countdownTimerId = setTimeout(
      i < steps.length ? next : beginBattle,
      i < steps.length ? 1000 : 700
    );
  }
  next();
}

function stopCountdown() {
  state.countdownActive = false;
  clearTimeout(state.countdownTimerId);
  state.countdownTimerId = null;
  el.countdownOverlay.style.display = 'none';
}

function advanceToNextStage() {
  state.currentStage++;
  const stageData  = getStageData(state.currentStage);
  state.diffLevel  = stageData.diffLevel;
  // playerHp とコンボは引き継ぎ

  el.enemyEmoji.innerHTML = stageData.emoji;
  el.enemyName.textContent  = stageData.name;
  renderHp();
  renderStage();
  renderDiffLevel();

  state.isPlaying = true;
  el.typingInput.disabled = false;
  showNextWord();
  setTimeout(() => el.typingInput.focus(), 50);
  startTimer();
}

function stageClear() {
  if (state.currentStage > getBestStage()) setBestStage(state.currentStage);
  const currentEnemyIdx = Math.floor((state.currentStage - 1) / 5) % STAGE_ENEMIES.length;
  const nextEnemyIdx    = Math.floor(state.currentStage       / 5) % STAGE_ENEMIES.length;
  if (currentEnemyIdx !== nextEnemyIdx) {
    el.enemyArea.classList.remove('anim-enemy-appear');
    triggerAnimation(el.enemyArea, 'anim-enemy-defeat');
    setTimeout(() => {
      el.enemyArea.classList.remove('anim-enemy-defeat');
      advanceToNextStage();
      void el.enemyArea.offsetWidth;
      el.enemyArea.classList.add('anim-enemy-appear');
    }, 850);
  } else {
    advanceToNextStage();
  }
}

function beginBattle() {
  state.countdownActive = false;
  el.countdownOverlay.style.display = 'none';
  state.isPlaying = true;
  el.typingInput.disabled = false;
  showNextWord();
  setTimeout(() => el.typingInput.focus(), 80);
  startTimer();
}

function endGame() {
  stopTimer();
  stopCountdown();
  clearTimeout(state.wordTimerId);
  state.wordTimerId = null;
  state.isPlaying = false;

  el.timerBar.style.width = '0%';
  el.timerBar.classList.remove('warning');
  el.typingInput.disabled = true;

  el.finalScoreValue.textContent = state.score;

  const acc = state.totalKeystrokes > 0
    ? Math.round(state.correctKeystrokes / state.totalKeystrokes * 100)
    : 100;
  const kpm = state.totalKeystrokes; // 60秒ゲームなので打鍵数 = 打鍵/分

  if (state.gameType === 'battle') {
    if (state.currentStage > getBestStage()) setBestStage(state.currentStage);
    const best = getBestStage();
    el.reachedStageInfo.textContent   = `到達ステージ: Stage ${state.currentStage}`;
    el.bestStageInfo.textContent      = `最高記録: Stage ${best}`;
    el.battleHpSummary.textContent    = `残りHP: ${Math.max(0, state.playerHp)}`;
    el.resultStats.innerHTML          = `<span class="stat-pill">正確率 ${acc}%</span>`;
    el.resultMessage.textContent      = '';
    el.bestScoreInfo.textContent      = '';
    el.battleResult.style.display     = 'block';
    el.battleEndText.textContent      = '敗北...';
    el.battleEndText.style.color      = 'var(--hard)';
    el.battleEndOverlay.style.display = 'flex';
    setTimeout(() => {
      el.battleEndOverlay.style.display = 'none';
      showScreen('result');
    }, 1500);
  } else {
    const prev = getBestScore();
    const isNew = state.score > prev;
    if (isNew) setBestScore(state.score);
    const best = isNew ? state.score : prev;
    el.resultStats.innerHTML      = `<span class="stat-pill">打鍵速度 ${kpm} 打/分</span><span class="stat-pill">正確率 ${acc}%</span>`;
    el.resultMessage.textContent  = getResultMessage(state.score);
    el.bestScoreInfo.textContent  = isNew && state.score > 0
      ? `🎉 新記録！ ベスト: ${best} 語`
      : best > 0 ? `ベスト: ${best} 語` : '';
    el.battleResult.style.display = 'none';
    setTimeout(() => showScreen('result'), 350);
  }
}

function resetToStart() {
  stopTimer();
  stopCountdown();
  clearTimeout(state.wordTimerId);
  state.isPlaying    = false;
  state.currentStage = 1;
  el.modeSelector.style.display = state.gameType === 'battle' ? 'none' : 'block';
  showScreen('start');
}

function pauseGame() {
  if (state.countdownActive) {
    stopCountdown();
    showScreen('pause');
    return;
  }
  if (!state.isPlaying) return;
  stopTimer();
  state.isPlaying = false;
  showScreen('pause');
}

function resumeGame() {
  showScreen('game');
  if (!state.currentWord) {
    // カウントダウン中にポーズした場合はカウントダウンをやり直す
    startCountdown();
    return;
  }
  state.isPlaying = true;
  startTimer();
  setTimeout(() => el.typingInput.focus(), 50);
}

// ================================
// Input Handling
// ================================
function handleTypingInput(event) {
  if (!state.isPlaying) return;
  if (!state.currentWord) return; // 次の単語を待機中

  const typed = event.target.value;
  const isInsertion = state._insertPending;
  state._insertPending = false;
  if (isInsertion) state.totalKeystrokes++;

  // 間違えた文字を即座に除去して最後の正しいプレフィックスに戻す
  if (!state.currentWord.startsWith(typed)) {
    const alt = state.currentWordAlts.find(a => a.startsWith(typed));
    if (alt) {
      state.currentWord = alt;
      // fall through to render and completion check
    } else {
      playSound('miss');
      state.currentWordMissed = true;
      if (state.gameType === 'battle') {
        state.combo = 0;
        renderCombo();
        triggerAnimation(el.battleFlash, 'anim-flash');
        state.playerHp = Math.max(0, state.playerHp - BATTLE_DAMAGE_PLAYER);
        renderHp();
        if (state.playerHp <= 0) { endGame(); return; }
      }
      let i = 0;
      while (i < typed.length && typed[i] === state.currentWord[i]) i++;
      el.typingInput.value = typed.slice(0, i);
      renderWordProgress(el.typingInput.value);
      return;
    }
  }

  if (isInsertion) state.correctKeystrokes++;
  renderWordProgress(typed);

  if (typed !== state.currentWord) {
    playSound('key');
    return;
  }

  // 正解
  playSound('correct');
  state.score++;
  renderScore();

  const correctWord = state.currentWord;
  state.lastWord = state.currentWord;
  state.currentWord = '';
  el.typingInput.value = '';
  el.currentWord.textContent = correctWord;
  triggerAnimation(el.currentWord, 'anim-correct');

  if (state.gameType === 'battle') {
    state.combo++;
    renderCombo();
    if (!state.currentWordMissed && state.playerHp < BATTLE_MAX_HP) {
      state.playerHp = Math.min(BATTLE_MAX_HP, state.playerHp + 5);
      renderHp();
    }
    triggerAnimation(el.enemyArea, 'anim-enemy-hit');
    state.isPlaying = false;
    stopTimer();
    state.timeLeft = state.wordTimeLimit;
    renderTimer();
    el.typingInput.disabled = true;
    clearTimeout(state.wordTimerId);
    state.wordTimerId = setTimeout(stageClear, CORRECT_ANIM_MS);
    return;
  }

  clearTimeout(state.wordTimerId);
  state.wordTimerId = setTimeout(showNextWord, CORRECT_ANIM_MS);
}

function handleBeforeInput(event) {
  if (!state.isPlaying) return;
  if (!event.inputType.startsWith('insert')) return;
  if (!state.currentWord) { event.preventDefault(); return; }
  state._insertPending = true;
}

// ================================
// Mode Selection
// ================================
function handleModeSelection(event) {
  const btn = event.target.closest('.mode-btn');
  if (!btn) return;

  state.mode = btn.dataset.mode;

  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  el.modeDescription.textContent = MODE_DESCRIPTIONS[state.mode];
}

// ================================
// Event Listeners
// ================================
function initEventListeners() {
  el.gametypeBtnGroup.addEventListener('click', (event) => {
    const btn = event.target.closest('.gametype-btn');
    if (!btn) return;
    state.gameType = btn.dataset.type;
    el.gametypeBtnGroup.querySelectorAll('.gametype-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    syncStartScreenUI();
  });
  el.modeButtonGroup.addEventListener('click', handleModeSelection);
  el.startBtn.addEventListener('click', startGame);
  el.typingInput.addEventListener('beforeinput', handleBeforeInput);
  el.typingInput.addEventListener('input', handleTypingInput);
  el.restartBtn.addEventListener('click', resetToStart);
  screens.game.addEventListener('click', () => {
    if (state.isPlaying) el.typingInput.focus();
  });
  el.soundBtn.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    try { localStorage.setItem(SOUND_KEY, state.soundEnabled ? 'on' : 'off'); } catch { /* ignore */ }
    el.soundBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
    el.soundBtn.classList.toggle('muted', !state.soundEnabled);
  });
  el.pauseBtn.addEventListener('click', pauseGame);
  el.resumeBtn.addEventListener('click', resumeGame);
  el.retryBtn.addEventListener('click', startGame);
  el.homeBtn.addEventListener('click', resetToStart);
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (state.isPlaying || state.countdownActive) pauseGame();
    else if (screens.pause.classList.contains('active')) resumeGame();
  });
}

// ================================
// Init
// ================================
function init() {
  initEventListeners();
  el.soundBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
  el.soundBtn.classList.toggle('muted', !state.soundEnabled);
  showScreen('start');
}

init();
