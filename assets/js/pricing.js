document.addEventListener("DOMContentLoaded", function () {
  // Función que cambia los detalles según el plan seleccionado

  // Obtener los botones por su ID
  const classroomButton = document.getElementById("classroomSelector");
  const schoolButton = document.getElementById("schoolSelector");
  const universityButton = document.getElementById("universitySelector");

  // Aseguramos que al menos uno de los botones esté seleccionado por defecto
  classroomButton.classList.add("Selected");

  // Función para manejar el clic en los botones
  function handleButtonClick(selectedButton) {
    // Eliminar la clase 'Selected' de todos los botones
    classroomButton.classList.remove("Selected");
    schoolButton.classList.remove("Selected");
    universityButton.classList.remove("Selected");

    // Agregar la clase 'Selected' al botón que fue clickeado
    selectedButton.classList.add("Selected");

    // Llamar a la función para actualizar los detalles del plan
    updatePlanDetails(selectedButton.dataset.plan);
  }

  function updatePlanDetails(plan) {
    console.log("Plan seleccionado:", plan);

    const dynamicTitle = document.getElementById("dynamic_title");
    const dynamicSubtitle = document.getElementById("dynamic_subtitle");
    const dynamicPricing = document.getElementById("dynamic_pricing");
    const dynamicCredits = document.getElementById("dynamic_credits");
    const dynamicStorage = document.getElementById("dynamic_storage");
    const dynamicUsers = document.getElementById("dynamic_users");
    const dynamicAddUsers = document.getElementById("dynamic_add-users");
    const dynamicPricingUsers = document.getElementById(
      "dynamic_pricing-users"
    );
    const dynamicPricingDescription = document.getElementById(
      "dynamic_pricing-description"
    );
    const dynamicFeaturesList = document.getElementById(
      "dynamic_features_list"
    );
    const dynamicSpecialAclaration = document.getElementById(
      "dynamic_special-aclaration"
    );

    if (
      !dynamicTitle ||
      !dynamicSubtitle ||
      !dynamicPricing ||
      !dynamicCredits ||
      !dynamicStorage ||
      !dynamicUsers ||
      !dynamicFeaturesList
    ) {
      console.error("Uno o más elementos no se encontraron en el DOM.");
      return;
    }

    dynamicFeaturesList.innerHTML = ""; // Limpiar la lista de características

    // Lógica de actualización de contenido según el plan seleccionado
    if (plan === "classroom") {
      // Configurar Classroom
      dynamicTitle.innerHTML = "Classroom";
      dynamicSubtitle.innerHTML =
        "Ideal for classrooms and small groups creating interactive learning experiences.";
      dynamicPricing.innerHTML = '<h2 class="YearPrice">€ 80</h2> / month';
      dynamicCredits.innerHTML =
        '<img src="../../assets/img/sub_ai_icon.svg" /><span>200,000 AI credits</span>';
      dynamicStorage.innerHTML =
        '<img src="../../assets/img/sub_storage_ic.svg" /><span>5 GB Storage</span>';
      dynamicUsers.innerHTML =
        '<img src="../../assets/img/sub_users_ic.svg"/><span>25 Users (expandable to 75)</span>';
      dynamicAddUsers.innerHTML = "";
      dynamicSpecialAclaration.innerHTML = "*billed annually";

      // Agregar características para Classroom
      const classroomFeatures = [
        "Tapybl AI",
        "Workflow-based lesson builder",
        "Assessable course tools",
        "Slide-to-video generation",
        "Create unlimited courses",
        "Supplemental learning paths",
        "Advanced interactive features",
        "Course analytics",
        "Dynamic challenge branching",
        "1 Creator license (Limit 1 creator per workspace)",
      ];

      classroomFeatures.forEach((feature) => {
        const featureItem = document.createElement("div");
        featureItem.className = "FeatureItem";
        featureItem.innerHTML = `<img src="../../assets/img/subscriotion_green_check.svg" />${feature}`;
        dynamicFeaturesList.appendChild(featureItem);
      });
    } else if (plan === "school") {
      // Configurar School
      dynamicTitle.innerHTML = "School";
      dynamicSubtitle.innerHTML =
        "Perfect for schools with multiple classrooms or small districts.";
      dynamicPricing.innerHTML = '<h2 class="YearPrice">€ 520</h2> / month';
      dynamicCredits.innerHTML =
        '<img src="../../assets/img/sub_ai_icon.svg" /><span>400,000 AI credits</span>';
      dynamicStorage.innerHTML =
        '<img src="../../assets/img/sub_storage_ic.svg" /><span>50 GB Storage</span>';
      dynamicUsers.innerHTML =
        '<img src="../../assets/img/sub_users_ic.svg"/><span>250 Users (expandable to 400)</span>';
      dynamicAddUsers.innerHTML = "";
      dynamicSpecialAclaration.innerHTML = "*billed annually";

      // Agregar características básicas para Classroom
      const classroomFeatures = [
        "Tapybl AI",
        "Workflow-based lesson builder",
        "Assessable course tools",
        "Slide-to-video generation",
        "Create unlimited courses",
        "Supplemental learning paths",
        "Advanced interactive features",
        "Course analytics",
        "Dynamic challenge branching",
        "1 Creator license (Limit 1 creator per workspace)",
      ];

      classroomFeatures.forEach((feature) => {
        const featureItem = document.createElement("div");
        featureItem.className = "FeatureItem";
        featureItem.innerHTML = `<img src="../../assets/img/subscriotion_green_check.svg" />${feature}`;
        dynamicFeaturesList.appendChild(featureItem);
      });

      // Agregar características específicas de School
      const schoolFeatures = [
        "White Label / Customization",
        "Advanced analytics & visual reporting",
        "LTI 1.3 support",
      ];

      schoolFeatures.forEach((feature) => {
        const featureItem = document.createElement("div");
        featureItem.className = "FeatureItem";
        featureItem.innerHTML = `<img src="../../assets/img/subscriotion_green_check.svg" />${feature}`;
        dynamicFeaturesList.appendChild(featureItem);
      });
    } else if (plan === "university") {
      // Configurar University
      dynamicTitle.innerHTML = "University / District";
      dynamicSubtitle.innerHTML =
        "Ideal for larger universities or districts with extensive requirements.";
      dynamicPricing.innerHTML = '<h2 class="YearPrice">On request</h2>';
      dynamicCredits.innerHTML =
        '<img src="../../assets/img/sub_ai_icon.svg" /><span>3,000,000 AI credits</span>';
      dynamicStorage.innerHTML =
        '<img src="../../assets/img/sub_storage_ic.svg" /><span>100 GB Storage</span>';
      dynamicUsers.innerHTML =
        '<img src="../../assets/img/sub_users_ic.svg"/><span>Unlimited users</span>';
      dynamicAddUsers.innerHTML = ""; // Ocultar sección de agregar usuarios
      dynamicSpecialAclaration.innerHTML = ""; // Ocultar aclaración especial
      dynamicPricingUsers.innerHTML = "";
      dynamicPricingDescription.innerHTML = "";
      // Agregar características para Classroom
      const classroomFeatures = [
        "Tapybl AI",
        "Workflow-based lesson builder",
        "Assessable course tools",
        "Slide-to-video generation",
        "Create unlimited courses",
        "Supplemental learning paths",
        "Advanced interactive features",
        "Course analytics",
        "Dynamic challenge branching",
        "1 Creator license (Limit 1 creator per workspace)",
      ];

      classroomFeatures.forEach((feature) => {
        const featureItem = document.createElement("div");
        featureItem.className = "FeatureItem";
        featureItem.innerHTML = `<img src="../../assets/img/subscriotion_green_check.svg" />${feature}`;
        dynamicFeaturesList.appendChild(featureItem);
      });

      // Agregar características específicas de University
      const universityFeatures = [
        "White Label / Customization",
        "Advanced analytics & visual reporting",
        "LTI 1.3 support",
        "Full SCORM Support with Player Integration",
        "Custom Data Storage & Integrations",
        "Personalized Account & Onboarding Support",
      ];

      universityFeatures.forEach((feature) => {
        const featureItem = document.createElement("div");
        featureItem.className = "FeatureItem";
        featureItem.innerHTML = `<img src="../../assets/img/subscriotion_green_check.svg" />${feature}`;
        dynamicFeaturesList.appendChild(featureItem);
      });
    }
  }
  // Asignar eventos de clic a cada botón usando su ID
  classroomButton.addEventListener("click", function () {
    handleButtonClick(classroomButton);
  });

  schoolButton.addEventListener("click", function () {
    handleButtonClick(schoolButton);
  });

  universityButton.addEventListener("click", function () {
    handleButtonClick(universityButton);
  });
});
