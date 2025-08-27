export default function Page() {
  return (
    <div className="space-y-5">
      {/* KPIs — الخمسة الصحيحة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="kpi">
          <div>
            <div className="kpi-title">إجمالي المنشآت</div>
            <div className="kpi-value mt-1">1.18M</div>
            <div className="kpi-hint">آخر تحديث: 2025</div>
          </div>
          <span className="badge badge--up">YoY +4.2%</span>
        </div>

        <div className="kpi">
          <div>
            <div className="kpi-title">معدل النمو السنوي (YoY)</div>
            <div className="kpi-value mt-1">5.1%</div>
            <div className="kpi-hint">مقارنة بـ 2024</div>
          </div>
          <span className="badge badge--up">+0.8 نقطة</span>
        </div>

        <div className="kpi">
          <div>
            <div className="kpi-title">التغير الفصلي (QoQ)</div>
            <div className="kpi-value mt-1">+0.8%</div>
            <div className="kpi-hint">مقارنة بالربع السابق</div>
          </div>
          <span className="badge">ربع سنوي</span>
        </div>

        <div className="kpi">
          <div>
            <div className="kpi-title">القطاع الأسرع نموًا</div>
            <div className="kpi-value mt-1">التقنية</div>
            <div className="kpi-hint">+12.3% YoY</div>
          </div>
          <span className="badge">Top</span>
        </div>

        <div className="kpi">
          <div>
            <div className="kpi-title">المنطقة الأعلى تركّزًا</div>
            <div className="kpi-value mt-1">الرياض</div>
            <div className="kpi-hint">حصة 24%</div>
          </div>
          <span className="badge">285K منشأة</span>
        </div>
      </div>

      {/* رسومات — أماكن نظيفة جاهزة للتوصيل */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="card p-5">
          <header className="mb-3 section-title">توزيع المنشآت حسب الحجم</header>
          <div className="h-56 rounded-lg bg-white/5 border border-[var(--color-border-soft)] grid place-items-center opacity-80 text-sm">
            (Donut Placeholder)
          </div>
        </section>

        <section className="card p-5">
          <header className="mb-3 section-title">تطور المؤشرات المالية</header>
          <div className="h-56 rounded-lg bg-white/5 border border-[var(--color-border-soft)] grid place-items-center opacity-80 text-sm">
            (Line Placeholder: إيرادات/نفقات/فائض 2019–2025)
          </div>
        </section>

        <section className="card p-5">
          <header className="mb-3 section-title">جاهزية للنمو</header>
          <div className="h-56 rounded-lg bg-white/5 border border-[var(--color-border-soft)] grid place-items-center opacity-80 text-sm">
            (Gauge Placeholder + توصية قصيرة)
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="card p-5 lg:col-span-2">
          <header className="mb-3 section-title">تطور عدد المنشآت عبر السنوات</header>
          <div className="h-64 rounded-lg bg-white/5 border border-[var(--color-border-soft)] grid place-items-center opacity-80 text-sm">
            (Stacked Bar Placeholder حسب الحجم)
          </div>
        </section>

        <section className="card p-5">
          <header className="mb-3 section-title">أفضل المناطق / القطاعات</header>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="opacity-85">الرياض</span><span className="opacity-70">حصة 24%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-85">جدة</span><span className="opacity-70">حصة 17%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-85">الدمام</span><span className="opacity-70">حصة 11%</span>
            </div>
          </div>
        </section>
      </div>

      <section className="card p-5">
        <header className="mb-3 section-title">الخريطة التفاعلية (Choropleth)</header>
        <div className="h-80 rounded-lg bg-white/5 border border-[var(--color-border-soft)] grid place-items-center opacity-80 text-sm">
          (Mapbox Placeholder)
        </div>
      </section>

      {/* مشاريعك (مصغّرة جداً) */}
      <section className="card p-5">
        <header className="mb-3 section-title">مشاريعك ونتائج التحليل</header>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <div className="card p-4">
            <div className="flex items-center gap-2">
              <span className="badge badge--up">جاهزة للنمو</span>
              <span className="font-semibold text-sm">منصة التجارة الإلكترونية</span>
              <span className="text-xs opacity-70">· الرياض · التقنية</span>
            </div>
            <div className="mt-3 text-sm opacity-90">
              منشأتك جاهزة للنمو بنسبة 78%… (ملخص قصير جدًا).
            </div>
            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--color-accent)]" style={{ width: "78%" }} />
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center gap-2">
              <span className="badge">محتملة للنمو</span>
              <span className="font-semibold text-sm">مقهى القهوة العربية</span>
              <span className="text-xs opacity-70">· جدة · الخدمات</span>
            </div>
            <div className="mt-3 text-sm opacity-90">
              منشأتك محتملة للنمو بنسبة 63%… (ملخص قصير).
            </div>
            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white/60" style={{ width: "63%" }} />
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center gap-2">
              <span className="badge">بحاجة لتحسين</span>
              <span className="font-semibold text-sm">منتجات حرفية</span>
              <span className="text-xs opacity-70">· الدمام · التصنيع</span>
            </div>
            <div className="mt-3 text-sm opacity-90">
              الجاهزية 41%… (ملخص قصير).
            </div>
            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white/40" style={{ width: "41%" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
