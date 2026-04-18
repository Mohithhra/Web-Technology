// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

// ===== EXERCISE DATABASE (60 exercises) =====
const exercises = [
  // CHEST
  { id:1, name:'Bench Press', icon:'🏋️', muscle:'chest', equip:'barbell', level:'intermediate', type:'Compound',
    sets:4, reps:'8', rest:90, calories:12,
    targets:'Pectoralis Major, Anterior Deltoid, Triceps',
    steps:['Lie flat on a bench with feet firmly on the ground.','Grip the bar slightly wider than shoulder-width.','Unrack the bar and lower it to mid-chest with control.','Press the bar back up explosively to full arm extension.','Squeeze your chest at the top before lowering again.'],
    tips:['Keep your back slightly arched and shoulder blades retracted.','Drive feet into the floor for a stable base.','Breathe in on the way down, out on the way up.'],
    mistakes:['Bouncing the bar off your chest.','Flaring elbows too wide.','Lifting hips off the bench.'] },
  { id:2, name:'Incline Dumbbell Press', icon:'💪', muscle:'chest', equip:'dumbbell', level:'intermediate', type:'Compound',
    sets:3, reps:'10', rest:90, calories:10,
    targets:'Upper Pectoralis, Anterior Deltoid, Triceps',
    steps:['Set bench to 30–45 degree incline.','Hold dumbbells at shoulder level, palms forward.','Press dumbbells up and slightly inward until arms are extended.','Lower slowly back to start position.'],
    tips:['Use a neutral grip to reduce shoulder stress.','Control the descent for maximum muscle tension.'],
    mistakes:['Setting the bench too steep (turns into a shoulder press).','Using too heavy a weight and losing form.'] },
  { id:3, name:'Cable Flyes', icon:'🔗', muscle:'chest', equip:'cable', level:'beginner', type:'Isolation',
    sets:3, reps:'15', rest:60, calories:7,
    targets:'Pectoralis Major (inner), Anterior Deltoid',
    steps:['Set cables at chest height on both sides.','Stand in the center with one foot forward.','With slightly bent arms, bring handles together in a hugging motion.','Slowly return to start, feeling the stretch across your chest.'],
    tips:['Keep a slight bend in the elbows throughout.','Focus on the squeeze, not just moving the weight.'],
    mistakes:['Straightening arms completely (shifts stress to triceps).','Using momentum instead of muscle control.'] },
  { id:4, name:'Push-Ups', icon:'⬆️', muscle:'chest', equip:'bodyweight', level:'beginner', type:'Compound',
    sets:3, reps:'20', rest:60, calories:8,
    targets:'Pectoralis Major, Triceps, Anterior Deltoid, Core',
    steps:['Place hands slightly wider than shoulder-width.','Body forms a straight line from head to heels.','Lower your chest to just above the floor.','Push back up to the starting position.'],
    tips:['Engage your core throughout the movement.','Look slightly ahead, not straight down.'],
    mistakes:['Sagging hips.','Flaring elbows out at 90 degrees.','Not going through full range of motion.'] },
  { id:5, name:'Chest Dips', icon:'⬇️', muscle:'chest', equip:'bodyweight', level:'intermediate', type:'Compound',
    sets:4, reps:'12', rest:60, calories:10,
    targets:'Lower Pectoralis, Triceps, Anterior Deltoid',
    steps:['Grip parallel bars with arms extended.','Lean slightly forward and lower your body.','Descend until upper arms are parallel to the floor.','Press back up without fully locking elbows.'],
    tips:['Leaning forward shifts emphasis to chest over triceps.','Add weight with a dip belt once bodyweight is easy.'],
    mistakes:['Not leaning forward enough.','Going too fast on the descent.'] },

  // BACK
  { id:6, name:'Deadlift', icon:'🏋️', muscle:'back', equip:'barbell', level:'advanced', type:'Compound',
    sets:5, reps:'5', rest:120, calories:15,
    targets:'Erector Spinae, Glutes, Hamstrings, Lats, Traps',
    steps:['Stand with bar over mid-foot, hip-width stance.','Hinge at the hips and grip the bar just outside your legs.','Take a deep breath, brace your core, and push the floor away.','Keep the bar close to your body as you stand up tall.','Lower the bar with control by hinging at the hips first.'],
    tips:['Keep a neutral spine — no rounding the lower back.','Think "push the floor away" not "pull the bar up".','Engage lats to keep the bar tight to your body.'],
    mistakes:['Rounding the lower back.','Bar drifting away from the body.','Jerking the bar off the floor.'] },
  { id:7, name:'Pull-Ups', icon:'🤸', muscle:'back', equip:'bodyweight', level:'intermediate', type:'Compound',
    sets:4, reps:'10', rest:90, calories:11,
    targets:'Latissimus Dorsi, Biceps, Rear Deltoid, Rhomboids',
    steps:['Hang from a bar with an overhand grip, slightly wider than shoulder-width.','Depress and retract your shoulder blades.','Pull your chest toward the bar, leading with your elbows.','Lower yourself slowly back to a full hang.'],
    tips:['Initiate the movement by pulling your shoulder blades down.','Avoid kipping for strength development.'],
    mistakes:['Using momentum to swing up.','Not achieving full extension at the bottom.'] },
  { id:8, name:'Barbell Row', icon:'🏋️', muscle:'back', equip:'barbell', level:'intermediate', type:'Compound',
    sets:4, reps:'8', rest:90, calories:12,
    targets:'Latissimus Dorsi, Rhomboids, Rear Deltoid, Biceps',
    steps:['Hinge forward to about 45 degrees with a flat back.','Grip bar just outside hip width with overhand grip.','Pull the bar toward your lower abdomen, leading with elbows.','Squeeze shoulder blades together at the top.','Lower the bar with control.'],
    tips:['Keep your back flat — do not round at the lumbar.','Drive elbows back, not out to the sides.'],
    mistakes:['Using too much body momentum.','Pulling to the chest instead of the waist.'] },
  { id:9, name:'Lat Pulldown', icon:'⬇️', muscle:'back', equip:'machine', level:'beginner', type:'Compound',
    sets:3, reps:'12', rest:60, calories:9,
    targets:'Latissimus Dorsi, Biceps, Teres Major',
    steps:['Sit with knees under the pad, grab bar wider than shoulders.','Lean slightly back and pull the bar to your upper chest.','Squeeze your lats at the bottom.','Slowly return bar to the start position with arms fully extended.'],
    tips:['Think about pulling your elbows into your back pockets.','Maintain a slight lean back throughout.'],
    mistakes:['Pulling the bar behind the neck.','Using momentum to swing the weight down.'] },
  { id:10, name:'Seated Cable Row', icon:'🔗', muscle:'back', equip:'cable', level:'beginner', type:'Compound',
    sets:3, reps:'12', rest:60, calories:9,
    targets:'Rhomboids, Latissimus Dorsi, Rear Deltoid, Biceps',
    steps:['Sit at a cable row machine with feet on the platform.','Keep your back upright and pull the handle to your abdomen.','Squeeze your shoulder blades together at full contraction.','Extend arms and feel the stretch before next rep.'],
    tips:['Do not lean back excessively — this is a back exercise, not a rowing machine.'],
    mistakes:['Rounding the back on the return.','Shrugging the shoulders.'] },
  { id:11, name:'Face Pulls', icon:'🔗', muscle:'back', equip:'cable', level:'beginner', type:'Isolation',
    sets:3, reps:'20', rest:45, calories:6,
    targets:'Rear Deltoid, Rotator Cuff, Rhomboids, Traps',
    steps:['Set cable to head height with a rope attachment.','Pull the rope toward your face with elbows flared high.','Externally rotate at the top so hands end at ear level.','Slowly return to start.'],
    tips:['Great for shoulder health and posture correction.','Keep elbows above wrists throughout.'],
    mistakes:['Pulling the rope to the throat rather than the face.','Using too heavy a weight.'] },

  // SHOULDERS
  { id:12, name:'Overhead Press', icon:'🙌', muscle:'shoulders', equip:'barbell', level:'intermediate', type:'Compound',
    sets:4, reps:'8', rest:90, calories:11,
    targets:'Anterior Deltoid, Medial Deltoid, Triceps, Upper Traps',
    steps:['Stand with bar at collarbone level, grip just outside shoulders.','Take a deep breath, brace core, and press the bar straight up.','At the top, shrug slightly to elevate the scapula.','Lower bar back to collarbone with control.'],
    tips:['Keep your core braced to avoid lower-back hyperextension.','Move your head back slightly to let the bar pass, then forward again.'],
    mistakes:['Arching the lower back excessively.','Pressing in front of the body instead of straight up.'] },
  { id:13, name:'Lateral Raises', icon:'↔️', muscle:'shoulders', equip:'dumbbell', level:'beginner', type:'Isolation',
    sets:4, reps:'15', rest:60, calories:7,
    targets:'Medial Deltoid',
    steps:['Stand with dumbbells at your sides, slight bend in elbows.','Raise both arms out to shoulder height.','Lower slowly with control.'],
    tips:['Lead with your elbows, not your wrists.','Slight forward lean can shift stress to lateral head.'],
    mistakes:['Using momentum to swing the weights up.','Going above shoulder height.'] },
  { id:14, name:'Arnold Press', icon:'🔄', muscle:'shoulders', equip:'dumbbell', level:'intermediate', type:'Compound',
    sets:3, reps:'12', rest:60, calories:9,
    targets:'All Three Deltoid Heads, Triceps',
    steps:['Hold dumbbells at shoulder height, palms facing you.','As you press up, rotate palms outward.','Fully extend at the top with palms facing away.','Reverse the motion on the way down.'],
    tips:['The rotation hits all three deltoid heads.','Maintain control through the entire range.'],
    mistakes:['Rushing the rotation.','Not fully rotating the palms.'] },
  { id:15, name:'Rear Delt Flyes', icon:'↔️', muscle:'shoulders', equip:'dumbbell', level:'beginner', type:'Isolation',
    sets:3, reps:'15', rest:60, calories:6,
    targets:'Posterior Deltoid, Rhomboids, Teres Minor',
    steps:['Bend forward at the hips with slight knee bend.','Hold dumbbells below your chest, palms facing.','Raise arms out to sides with a slight bend in elbows.','Slowly lower back to start.'],
    tips:['Keep your neck neutral.','This is a key exercise for balanced shoulder development.'],
    mistakes:['Raising the arms too high.','Using too much weight and swinging.'] },

  // ARMS
  { id:16, name:'Barbell Curl', icon:'💪', muscle:'arms', equip:'barbell', level:'beginner', type:'Isolation',
    sets:4, reps:'10', rest:60, calories:8,
    targets:'Biceps Brachii, Brachialis',
    steps:['Stand with barbell at thigh level, underhand grip shoulder-width.','Curl the bar toward your shoulders, keeping elbows stationary.','Squeeze biceps at the top.','Lower with control.'],
    tips:['Keep your elbows pinned at your sides.','Avoid rocking your torso to generate momentum.'],
    mistakes:['Swinging the body.','Not fully extending the arms at the bottom.'] },
  { id:17, name:'Tricep Dips', icon:'⬇️', muscle:'arms', equip:'bodyweight', level:'beginner', type:'Compound',
    sets:4, reps:'12', rest:60, calories:9,
    targets:'Triceps Brachii, Anterior Deltoid, Pectoralis',
    steps:['Hold parallel bars with arms extended, stay upright.','Lower your body by bending the elbows to 90 degrees.','Press back up to full extension.'],
    tips:['Keep torso upright to emphasize triceps over chest.','Add weight once bodyweight becomes easy.'],
    mistakes:['Leaning too far forward.','Not going through full range of motion.'] },
  { id:18, name:'Hammer Curl', icon:'🔨', muscle:'arms', equip:'dumbbell', level:'beginner', type:'Isolation',
    sets:3, reps:'12', rest:60, calories:7,
    targets:'Brachialis, Brachioradialis, Biceps',
    steps:['Hold dumbbells at sides with a neutral (hammer) grip.','Curl both dumbbells up simultaneously.','Hold at the top, then lower with control.'],
    tips:['The neutral grip better targets the brachialis for arm thickness.'],
    mistakes:['Rotating the wrist during the curl.','Using momentum.'] },
  { id:19, name:'Skull Crushers', icon:'💀', muscle:'arms', equip:'barbell', level:'intermediate', type:'Isolation',
    sets:3, reps:'10', rest:60, calories:8,
    targets:'Triceps Brachii (Long Head)',
    steps:['Lie on a bench, hold barbell above your chest with straight arms.','Lower the bar toward your forehead by bending only at the elbows.','Press back to the starting position.'],
    tips:['Keep elbows pointed to the ceiling throughout.','A slight backward angle of the upper arm increases long head stretch.'],
    mistakes:['Flaring elbows outward.','Lowering the bar behind the head.'] },
  { id:20, name:'Tricep Pushdown', icon:'⬇️', muscle:'arms', equip:'cable', level:'beginner', type:'Isolation',
    sets:3, reps:'15', rest:45, calories:6,
    targets:'Triceps Brachii',
    steps:['Stand at a cable machine with a rope or bar attachment set high.','Keep elbows at your sides and push the attachment downward.','Fully extend arms at the bottom and squeeze the triceps.','Control the return to starting position.'],
    tips:['Keep your core braced and avoid leaning forward excessively.'],
    mistakes:['Letting elbows drift forward.','Using a weight so heavy that the elbows lift away from the sides.'] },

  // LEGS
  { id:21, name:'Squat', icon:'🦵', muscle:'legs', equip:'barbell', level:'intermediate', type:'Compound',
    sets:5, reps:'5', rest:120, calories:15,
    targets:'Quadriceps, Glutes, Hamstrings, Core, Erector Spinae',
    steps:['Position bar across upper traps, feet shoulder-width.','Take a deep breath and brace your core.','Hinge hips back and bend knees to descend.','Break parallel, then drive through heels to stand up.'],
    tips:['Keep your chest up and spine neutral.','Drive knees out in the direction of your toes.','Brace like you\'re about to take a punch.'],
    mistakes:['Caving knees inward.','Rounding the lower back.','Coming up onto tiptoes.'] },
  { id:22, name:'Romanian Deadlift', icon:'🏋️', muscle:'legs', equip:'barbell', level:'intermediate', type:'Compound',
    sets:4, reps:'8', rest:90, calories:12,
    targets:'Hamstrings, Glutes, Erector Spinae',
    steps:['Stand holding a bar at hip height.','Hinge at the hips with a slight knee bend, lowering the bar along your legs.','Feel a deep hamstring stretch at the bottom.','Drive hips forward to return to standing.'],
    tips:['Think "hips back" not "bend forward".','Keep the bar close to your legs throughout.'],
    mistakes:['Rounding the lower back.','Squatting instead of hinging.'] },
  { id:23, name:'Leg Press', icon:'🦵', muscle:'legs', equip:'machine', level:'beginner', type:'Compound',
    sets:4, reps:'12', rest:90, calories:11,
    targets:'Quadriceps, Glutes, Hamstrings',
    steps:['Sit in the machine with feet shoulder-width on the platform.','Lower the platform until knees reach 90 degrees.','Press through your heels back to near full extension.'],
    tips:['Do not lock out your knees at the top.','Foot placement affects muscle emphasis — higher targets glutes, lower targets quads.'],
    mistakes:['Allowing hips to lift off the seat.','Locking out the knees at full extension.'] },
  { id:24, name:'Lunges', icon:'🚶', muscle:'legs', equip:'dumbbell', level:'beginner', type:'Compound',
    sets:3, reps:'12', rest:60, calories:9,
    targets:'Quadriceps, Glutes, Hamstrings, Calves',
    steps:['Stand with dumbbells at your sides.','Step forward and lower your back knee toward the floor.','Front thigh should be parallel to the floor.','Push through the front heel to return to standing.'],
    tips:['Keep your torso upright throughout.','Step far enough forward that your front shin stays vertical.'],
    mistakes:['Front knee caving inward.','Leaning excessively forward.'] },
  { id:25, name:'Leg Curl', icon:'🦵', muscle:'legs', equip:'machine', level:'beginner', type:'Isolation',
    sets:3, reps:'15', rest:60, calories:7,
    targets:'Hamstrings, Gastrocnemius',
    steps:['Lie face down on the leg curl machine.','Position the pad just above the heels.','Curl the pad toward your glutes.','Lower with control.'],
    tips:['Avoid lifting your hips off the pad.','Plantarflex your feet (point toes) for peak contraction.'],
    mistakes:['Swinging the weight using hip flexors.','Incomplete range of motion.'] },
  { id:26, name:'Calf Raises', icon:'⬆️', muscle:'legs', equip:'barbell', level:'beginner', type:'Isolation',
    sets:4, reps:'20', rest:45, calories:5,
    targets:'Gastrocnemius, Soleus',
    steps:['Stand with the balls of your feet on a raised surface.','Rise up as high as possible on your toes.','Hold the contraction briefly at the top.','Lower your heels below the platform for a full stretch.'],
    tips:['Slow tempo (2-3 seconds each phase) is more effective than fast reps.','Train calves through full range — heels below platform.'],
    mistakes:['Not going through full range of motion.','Bouncing at the bottom.'] },

  // CORE
  { id:27, name:'Plank', icon:'📏', muscle:'core', equip:'bodyweight', level:'beginner', type:'Isometric',
    sets:3, reps:'60', rest:45, calories:5,
    targets:'Transverse Abdominis, Obliques, Erector Spinae, Glutes',
    steps:['Prop yourself on forearms and toes, forming a straight line.','Engage your core, glutes and quads.','Hold the position without letting hips sag or rise.'],
    tips:['Squeeze your glutes for a stronger, more stable plank.','Breathe normally — do not hold your breath.'],
    mistakes:['Hips sagging toward the floor.','Holding breath instead of breathing steadily.'] },
  { id:28, name:'Cable Crunch', icon:'🔗', muscle:'core', equip:'cable', level:'intermediate', type:'Isolation',
    sets:4, reps:'15', rest:45, calories:7,
    targets:'Rectus Abdominis, Obliques',
    steps:['Kneel below a high cable with a rope attachment.','Hold the rope behind your head.','Flex your spine, crunching elbows toward your knees.','Slowly reverse to a full stretch.'],
    tips:['Do not pull with your arms — let the abs do the work.','Round your back to maximise ab activation.'],
    mistakes:['Hip flexors doing the work instead of the abs.','Not rounding the back.'] },
  { id:29, name:'Hanging Leg Raise', icon:'🤸', muscle:'core', equip:'bodyweight', level:'intermediate', type:'Compound',
    sets:4, reps:'12', rest:60, calories:8,
    targets:'Rectus Abdominis (Lower), Hip Flexors, Obliques',
    steps:['Hang from a pull-up bar with full arm extension.','Brace your core and raise your legs to parallel or higher.','Lower with control — do not swing.'],
    tips:['Tuck knees to chest first if straight leg raises are too difficult.','Posterior pelvic tilt at the top maximises ab contraction.'],
    mistakes:['Swinging and using momentum.','Not controlling the descent.'] },
  { id:30, name:'Russian Twists', icon:'🔄', muscle:'core', equip:'dumbbell', level:'beginner', type:'Rotation',
    sets:3, reps:'20', rest:45, calories:6,
    targets:'Obliques, Transverse Abdominis, Hip Flexors',
    steps:['Sit on the floor with knees bent, leaning back at 45 degrees.','Hold a dumbbell or plate with both hands.','Rotate your torso side to side, touching the weight to the floor each time.'],
    tips:['Lift feet off the floor to increase difficulty.','Lead the rotation with your shoulders, not just your arms.'],
    mistakes:['Rotating only the arms and not the torso.','Moving too fast and losing control.'] },
  { id:31, name:'Ab Rollout', icon:'⬆️', muscle:'core', equip:'barbell', level:'advanced', type:'Compound',
    sets:3, reps:'10', rest:60, calories:8,
    targets:'Rectus Abdominis, Obliques, Lats, Shoulders',
    steps:['Kneel on the floor holding a barbell with plates.','Roll the bar forward, extending your body as far as possible.','Use your abs to pull yourself back to the starting position.'],
    tips:['Avoid letting your hips sag — maintain a hollow body position.'],
    mistakes:['Using the hips to extend rather than the abs to pull back.','Going too far and losing lumbar control.'] },

  // CARDIO
  { id:32, name:'Burpees', icon:'🔥', muscle:'cardio', equip:'bodyweight', level:'intermediate', type:'HIIT',
    sets:5, reps:'10', rest:30, calories:14,
    targets:'Full Body, Cardiovascular System',
    steps:['Stand, then drop your hands to the floor.','Jump feet back into a plank position.','Do a push-up (optional).','Jump feet back to your hands.','Explosively jump up with arms overhead.'],
    tips:['Focus on explosive movement for maximum calorie burn.','Modify by stepping instead of jumping if needed.'],
    mistakes:['Not landing softly on the jump.','Sagging in the plank position.'] },
  { id:33, name:'Box Jumps', icon:'📦', muscle:'cardio', equip:'bodyweight', level:'intermediate', type:'Plyometric',
    sets:4, reps:'8', rest:60, calories:10,
    targets:'Quadriceps, Glutes, Calves, Fast-Twitch Fibres',
    steps:['Stand in front of a sturdy box.','Lower into a quarter squat and swing arms back.','Explode upward onto the box, landing softly with bent knees.','Step back down — do not jump down.'],
    tips:['Land silently to indicate proper deceleration and control.','Choose a box height that is challenging but allows safe landing.'],
    mistakes:['Landing with straight legs.','Jumping down instead of stepping.'] },
  { id:34, name:'Jump Rope', icon:'🪢', muscle:'cardio', equip:'bodyweight', level:'beginner', type:'HIIT',
    sets:5, reps:'60', rest:30, calories:12,
    targets:'Calves, Cardiovascular System, Coordination',
    steps:['Hold handles at hip height, rope behind you.','Swing the rope over your head and jump as it reaches your feet.','Land softly on the balls of your feet.'],
    tips:['Keep jumps small — just enough to clear the rope.','Look straight ahead, not at your feet.'],
    mistakes:['Jumping too high.','Swinging arms wide instead of keeping them at sides.'] },
  { id:35, name:'Battle Ropes', icon:'🌊', muscle:'cardio', equip:'machine', level:'intermediate', type:'HIIT',
    sets:4, reps:'30', rest:45, calories:13,
    targets:'Shoulders, Core, Cardiovascular System, Grip',
    steps:['Anchor a thick rope around a post at floor level.','Hold one end in each hand, standing with knees slightly bent.','Create alternating waves by rapidly raising and lowering each arm.'],
    tips:['Keep your core braced throughout.','Try different patterns: alternating waves, double waves, slams.'],
    mistakes:['Standing too close to the anchor.','Relaxing the core.'] },
  { id:36, name:'Mountain Climbers', icon:'🧗', muscle:'cardio', equip:'bodyweight', level:'beginner', type:'HIIT',
    sets:4, reps:'30', rest:30, calories:10,
    targets:'Core, Hip Flexors, Cardiovascular System',
    steps:['Start in a high plank position.','Drive one knee toward your chest, then quickly switch legs.','Maintain a stable plank throughout.'],
    tips:['Keep your hips level — do not let them rise.','The faster the movement, the higher the cardiovascular demand.'],
    mistakes:['Bouncing the hips up with each movement.','Not engaging the core.'] },

  // FULL BODY
  { id:37, name:'Clean and Press', icon:'🏋️', muscle:'full', equip:'barbell', level:'advanced', type:'Compound',
    sets:4, reps:'6', rest:120, calories:16,
    targets:'Full Body — Posterior Chain, Shoulders, Triceps, Core',
    steps:['Start with the bar on the floor, hip-width stance.','Explosively pull the bar upward, driving with the hips.','Catch the bar at shoulder level in a front rack position.','Press the bar overhead to full extension.','Lower safely to the floor.'],
    tips:['Technique is crucial — learn the clean and press movements separately first.'],
    mistakes:['Using arm strength to pull instead of hip drive.','Pressing before the clean is fully stabilised.'] },
  { id:38, name:'Kettlebell Swing', icon:'⚡', muscle:'full', equip:'dumbbell', level:'intermediate', type:'Compound',
    sets:4, reps:'20', rest:60, calories:13,
    targets:'Glutes, Hamstrings, Core, Shoulders, Cardiovascular System',
    steps:['Stand over the kettlebell with feet shoulder-width.','Hinge at the hips and swing the bell back between your legs.','Drive your hips forward explosively to propel the bell forward.','Allow the bell to swing to shoulder height.','Let it swing back and repeat the hip hinge.'],
    tips:['This is a hip hinge — not a squat.','The power comes from the hips, not the arms.'],
    mistakes:['Squatting instead of hinging.','Using your arms to lift the bell.'] },
  { id:39, name:'Thrusters', icon:'🚀', muscle:'full', equip:'barbell', level:'advanced', type:'Compound',
    sets:4, reps:'8', rest:90, calories:15,
    targets:'Quadriceps, Glutes, Shoulders, Triceps, Core',
    steps:['Hold barbell at shoulder height in front rack.','Squat down to parallel.','Drive up explosively and use the momentum to press the bar overhead.','Lower the bar back to shoulders as you descend into the next squat.'],
    tips:['The drive from the squat should power most of the press.'],
    mistakes:['Pausing between the squat and press — this breaks the kinetic chain.'] },
  { id:40, name:'Turkish Get-Up', icon:'🌅', muscle:'full', equip:'dumbbell', level:'advanced', type:'Compound',
    sets:3, reps:'5', rest:90, calories:11,
    targets:'Full Body — Rotator Cuff, Core, Glutes, Hips',
    steps:['Lie on your back, press the kettlebell up in one hand.','Roll to your elbow, then your hand.','Lift your hips off the floor.','Sweep your leg back and come to a kneeling position.','Stand up, then reverse each step to return to the floor.'],
    tips:['Keep your eyes on the weight at all times.','Go very slow — this exercise is about control, not speed.'],
    mistakes:['Rushing through the steps.','Looking away from the weight.'] },
  { id:41, name:'Medicine Ball Slam', icon:'🏐', muscle:'full', equip:'machine', level:'beginner', type:'Power',
    sets:4, reps:'12', rest:60, calories:11,
    targets:'Lats, Core, Shoulders, Hip Flexors',
    steps:['Hold a medicine ball overhead with both hands.','Slam the ball into the ground as hard as possible.','Catch the ball on the bounce (or pick it up) and repeat.'],
    tips:['Use your entire body — not just your arms.','Exhale sharply on the slam.'],
    mistakes:['Using only arm strength.','Looking down instead of keeping head up.'] },
  { id:42, name:'Farmer\'s Walk', icon:'🚶', muscle:'full', equip:'dumbbell', level:'beginner', type:'Compound',
    sets:4, reps:'40', rest:90, calories:12,
    targets:'Traps, Forearms, Core, Glutes, Calves',
    steps:['Hold heavy dumbbells or kettlebells at your sides.','Walk forward with short, deliberate steps.','Keep your core braced and chest up.'],
    tips:['Challenge your grip — use the heaviest weight you can carry with good posture.'],
    mistakes:['Hunching the shoulders forward.','Taking large, sloppy steps.'] },

  // MORE CHEST
  { id:43, name:'Pec Deck', icon:'💪', muscle:'chest', equip:'machine', level:'beginner', type:'Isolation',
    sets:3, reps:'15', rest:60, calories:7,
    targets:'Pectoralis Major (Inner), Anterior Deltoid',
    steps:['Adjust seat so your elbows are at shoulder height.','Place forearms on the pads.','Bring the pads together in a controlled arc.','Slowly return to the start, feeling a full chest stretch.'],
    tips:['Great as a finisher for maximum pump.','Control the negative for best results.'],
    mistakes:['Letting the weight pull your arms too far back.','Bouncing the pads together.'] },

  // MORE BACK
  { id:44, name:'T-Bar Row', icon:'🏋️', muscle:'back', equip:'barbell', level:'intermediate', type:'Compound',
    sets:4, reps:'10', rest:90, calories:12,
    targets:'Rhomboids, Latissimus Dorsi, Rear Deltoid, Traps',
    steps:['Straddle a barbell with one end against a wall.','Hinge forward and grip the bar with both hands.','Row the bar toward your chest.','Lower with control.'],
    tips:['Keep the movement strict — no excessive body swing.'],
    mistakes:['Rounding the lower back.','Pulling too high.'] },

  // MORE LEGS
  { id:45, name:'Hack Squat', icon:'🦵', muscle:'legs', equip:'machine', level:'beginner', type:'Compound',
    sets:4, reps:'10', rest:90, calories:11,
    targets:'Quadriceps, Glutes',
    steps:['Stand on the platform with shoulder and back against the pads.','Feet shoulder-width, slightly forward.','Lower until knees reach 90 degrees.','Drive through heels back to start.'],
    tips:['Great quad isolation — knees tracking over toes.'],
    mistakes:['Not going deep enough.','Letting knees cave inward.'] },
  { id:46, name:'Hip Thrust', icon:'⬆️', muscle:'legs', equip:'barbell', level:'intermediate', type:'Compound',
    sets:4, reps:'12', rest:90, calories:10,
    targets:'Glutes (Maximum), Hamstrings',
    steps:['Rest your upper back on a bench with a barbell across your hips.','Feet flat on the floor, hip-width apart.','Drive hips up by squeezing your glutes.','Hold at the top for 1 second.','Lower hips back to the floor.'],
    tips:['Best exercise for glute development.','Chin to chest to keep your neck neutral.'],
    mistakes:['Hyperextending the lower back at the top.','Driving through the toes instead of the heels.'] },

  // MORE SHOULDERS
  { id:47, name:'Upright Row', icon:'⬆️', muscle:'shoulders', equip:'barbell', level:'intermediate', type:'Compound',
    sets:3, reps:'12', rest:60, calories:8,
    targets:'Medial Deltoid, Upper Traps, Biceps',
    steps:['Hold a barbell with a narrow overhand grip.','Pull the bar straight up toward your chin.','Lead with your elbows, keeping them above the bar.','Lower with control.'],
    tips:['Use a wider grip to reduce shoulder impingement risk.'],
    mistakes:['Narrower grip causing shoulder impingement.','Leaning back to generate momentum.'] },

  // MORE CORE
  { id:48, name:'Dead Bug', icon:'🐛', muscle:'core', equip:'bodyweight', level:'beginner', type:'Stability',
    sets:3, reps:'10', rest:45, calories:5,
    targets:'Transverse Abdominis, Erector Spinae, Hip Flexors',
    steps:['Lie on your back with arms pointing to the ceiling.','Raise knees to 90 degrees.','Lower opposite arm and leg toward the floor simultaneously.','Return to start and alternate sides.'],
    tips:['Press your lower back flat to the floor throughout.','Move slowly and with full control.'],
    mistakes:['Letting the lower back arch off the floor.','Moving too fast.'] },
  { id:49, name:'Side Plank', icon:'📐', muscle:'core', equip:'bodyweight', level:'beginner', type:'Isometric',
    sets:3, reps:'30', rest:45, calories:5,
    targets:'Obliques, Transverse Abdominis, Glutes',
    steps:['Lie on your side, prop yourself up on your forearm.','Feet stacked, hips lifted to form a straight line.','Hold the position, core and glutes squeezed.'],
    tips:['Drive your hips up, not just holding them level.'],
    mistakes:['Hips sagging toward the floor.','Rolling forward or backward.'] },
  { id:50, name:'V-Ups', icon:'✌️', muscle:'core', equip:'bodyweight', level:'intermediate', type:'Dynamic',
    sets:3, reps:'15', rest:45, calories:7,
    targets:'Rectus Abdominis, Hip Flexors',
    steps:['Lie flat on the floor, arms extended overhead.','Simultaneously raise your legs and torso.','Try to touch your toes at the top.','Lower back down with control.'],
    tips:['Exhale sharply at the top of the movement.'],
    mistakes:['Using momentum to swing up.','Not controlling the descent.'] },

  // MORE FULL BODY
  { id:51, name:'Wall Ball', icon:'🏐', muscle:'full', equip:'machine', level:'beginner', type:'Compound',
    sets:4, reps:'15', rest:60, calories:12,
    targets:'Quadriceps, Glutes, Shoulders, Core',
    steps:['Hold a medicine ball at chest level, facing a wall.','Squat down, then explosively stand and throw the ball at a target above you.','Catch the ball and immediately descend into the next squat.'],
    tips:['Keep a smooth rhythm — squat and throw in one fluid motion.'],
    mistakes:['Pausing between the squat and the throw.','Standing too far from the wall.'] },
  { id:52, name:'Sled Push', icon:'🛷', muscle:'full', equip:'machine', level:'intermediate', type:'Compound',
    sets:4, reps:'20', rest:90, calories:18,
    targets:'Full Body — Quadriceps, Glutes, Calves, Shoulders, Core',
    steps:['Load a sled with appropriate weight.','Grip the handles and lean forward at an angle.','Drive through your legs in short, powerful strides.'],
    tips:['Keep a low, aggressive stance for maximum power transfer.'],
    mistakes:['Standing too upright.','Taking long, slow strides instead of short, quick ones.'] },

  // MORE ARMS
  { id:53, name:'Concentration Curl', icon:'💪', muscle:'arms', equip:'dumbbell', level:'beginner', type:'Isolation',
    sets:3, reps:'12', rest:45, calories:6,
    targets:'Biceps Brachii (Peak)',
    steps:['Sit on a bench, plant elbow on inner thigh.','Curl the dumbbell up, rotating your wrist outward at the top.','Squeeze the bicep hard at peak contraction.','Lower slowly.'],
    tips:['Great for building bicep peak.','Full supination at the top maximises muscle activation.'],
    mistakes:['Swinging the arm.','Not achieving full supination.'] },
  { id:54, name:'Close Grip Bench', icon:'🏋️', muscle:'arms', equip:'barbell', level:'intermediate', type:'Compound',
    sets:3, reps:'10', rest:75, calories:10,
    targets:'Triceps Brachii, Pectoralis (inner), Anterior Deltoid',
    steps:['Grip the bar shoulder-width (narrower than bench press).','Lower the bar to your lower chest with elbows close to your body.','Press back to full extension.'],
    tips:['Keep elbows close to your torso to maximise tricep involvement.'],
    mistakes:['Gripping too narrow — this stresses the wrists.','Flaring elbows out.'] },

  // MORE CARDIO
  { id:55, name:'Sprint Intervals', icon:'🏃', muscle:'cardio', equip:'bodyweight', level:'intermediate', type:'HIIT',
    sets:8, reps:'20', rest:40, calories:16,
    targets:'Full Cardiovascular System, Hamstrings, Glutes, Calves',
    steps:['Start at a moderate jog to warm up.','Sprint at maximum effort for 20 seconds.','Recover with a slow walk or jog for 40 seconds.','Repeat for the prescribed number of sets.'],
    tips:['True sprints require maximum effort — if you can chat, you\'re not sprinting.'],
    mistakes:['Not recovering enough between sprints.','Sprinting with poor posture.'] },
  { id:56, name:'Rowing Machine', icon:'🚣', muscle:'cardio', equip:'machine', level:'beginner', type:'Endurance',
    sets:1, reps:'20', rest:0, calories:14,
    targets:'Cardiovascular System, Back, Legs, Arms',
    steps:['Sit on the rower, strap in your feet.','Start with legs bent, arms extended, leaning slightly forward.','Drive through your legs first, then lean back, then pull the handle to your lower chest.','Return in reverse order: arms, lean forward, bend knees.'],
    tips:['Legs provide 60% of the power — do not row with arms alone.','Maintain a 1:2 ratio of pull to recovery.'],
    mistakes:['Pulling with the arms before extending the legs.','Rounding the back.'] },
  { id:57, name:'Assault Bike', icon:'🚲', muscle:'cardio', equip:'machine', level:'beginner', type:'HIIT',
    sets:5, reps:'20', rest:40, calories:18,
    targets:'Cardiovascular System, Shoulders, Legs',
    steps:['Sit on the bike and adjust the seat height.','Pedal and push/pull the handles simultaneously.','Control your pace — sprint intervals or steady state.'],
    tips:['The Assault Bike is one of the hardest conditioning tools available.','Breathe through your nose to control intensity.'],
    mistakes:['Pulling the handles with arms only — use your legs as well.'] },

  // MORE LEGS
  { id:58, name:'Step-Ups', icon:'⬆️', muscle:'legs', equip:'dumbbell', level:'beginner', type:'Compound',
    sets:3, reps:'12', rest:60, calories:9,
    targets:'Quadriceps, Glutes, Hamstrings, Balance',
    steps:['Stand in front of a bench or box, holding dumbbells.','Step up with one foot, driving through the heel.','Bring the other foot up and stand fully on the box.','Step down and alternate legs.'],
    tips:['Push through the elevated heel — not through the toes.'],
    mistakes:['Pushing off the back foot rather than driving through the front leg.'] },
  { id:59, name:'Sumo Squat', icon:'🦵', muscle:'legs', equip:'dumbbell', level:'beginner', type:'Compound',
    sets:3, reps:'15', rest:60, calories:9,
    targets:'Inner Quadriceps, Adductors, Glutes',
    steps:['Stand with feet wider than shoulder-width, toes pointed out.','Hold a dumbbell vertically at your chest.','Squat down, keeping knees tracking over toes.','Drive back up through your heels.'],
    tips:['Wider stance shifts emphasis to inner thighs and glutes.'],
    mistakes:['Caving knees inward.','Excessive forward lean.'] },
  { id:60, name:'Nordic Curl', icon:'🦵', muscle:'legs', equip:'bodyweight', level:'advanced', type:'Isolation',
    sets:3, reps:'6', rest:90, calories:8,
    targets:'Hamstrings (eccentric), Glutes',
    steps:['Kneel on a pad with feet anchored under a bar or held by a partner.','Slowly lower your torso toward the floor using your hamstrings.','Catch yourself with your hands when you can no longer control the descent.','Use hands to push back to the starting position.'],
    tips:['One of the best exercises for hamstring injury prevention.','Focus on the eccentric (lowering) phase.'],
    mistakes:['Going too fast on the descent.','Not going low enough.'] },
];

// ===== STATE =====
let activeFilters = { muscle: 'all', equip: 'all', level: 'all' };
let searchQ = '';
let selectedExercise = null;
let favourites = JSON.parse(localStorage.getItem('ironforge_favs') || '[]');

// ===== FILTER CHIPS =====
document.querySelectorAll('.chip[data-muscle]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chip[data-muscle]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilters.muscle = btn.getAttribute('data-muscle');
    applyFilters();
  });
});
document.querySelectorAll('.chip[data-equip]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chip[data-equip]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilters.equip = btn.getAttribute('data-equip');
    applyFilters();
  });
});
document.querySelectorAll('.chip[data-level]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chip[data-level]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilters.level = btn.getAttribute('data-level');
    applyFilters();
  });
});

function applyFilters() {
  searchQ = document.getElementById('searchInput').value.toLowerCase();
  let results = exercises;
  if (activeFilters.muscle !== 'all') results = results.filter(e => e.muscle === activeFilters.muscle);
  if (activeFilters.equip !== 'all') results = results.filter(e => e.equip === activeFilters.equip);
  if (activeFilters.level !== 'all') results = results.filter(e => e.level === activeFilters.level);
  if (searchQ) results = results.filter(e => e.name.toLowerCase().includes(searchQ) || e.muscle.includes(searchQ) || e.type.toLowerCase().includes(searchQ));
  renderGrid(results);
}

// ===== RENDER GRID =====
function renderGrid(list) {
  document.getElementById('resultsCount').textContent = `${list.length} exercise${list.length !== 1 ? 's' : ''}`;
  const grid = document.getElementById('libraryGrid');
  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state"><span class="ei">🔍</span><h3>No exercises found</h3><p>Try different filters</p></div>`;
    return;
  }
  grid.innerHTML = list.map((ex, i) => `
    <div class="ex-card ${favourites.includes(ex.id) ? 'favourite' : ''}" onclick="openModal(${ex.id})" style="animation-delay:${i * 0.04}s">
      <div class="ex-card-top">
        <div class="ex-card-icon">${ex.icon}</div>
        <button class="ex-card-fav" onclick="event.stopPropagation(); toggleFavCard(${ex.id}, this)">${favourites.includes(ex.id) ? '⭐' : '🤍'}</button>
      </div>
      <div class="ex-card-body">
        <div class="ex-card-name">${ex.name}</div>
        <div class="ex-card-muscle">${ex.muscle === 'full' ? 'Full Body' : ex.muscle}</div>
        <div class="ex-card-tags">
          <span class="ex-card-tag tag-equip">${ex.equip}</span>
          <span class="ex-card-tag tag-level">${ex.level}</span>
          <span class="ex-card-tag tag-type">${ex.type}</span>
        </div>
        <div class="ex-card-stats">
          <div class="ex-card-stat"><strong>${ex.sets}</strong><span>Sets</span></div>
          <div class="ex-card-stat"><strong>${ex.reps}</strong><span>${ex.muscle === 'cardio' && parseInt(ex.reps) > 15 ? 'Sec' : 'Reps'}</span></div>
          <div class="ex-card-stat"><strong>${ex.rest}s</strong><span>Rest</span></div>
        </div>
      </div>
      <div class="ex-card-level-bar level-${ex.level}"></div>
    </div>
  `).join('');
}

// ===== FAVOURITE =====
function toggleFavCard(id, btn) {
  if (favourites.includes(id)) {
    favourites = favourites.filter(f => f !== id);
    btn.textContent = '🤍';
    btn.closest('.ex-card').classList.remove('favourite');
  } else {
    favourites.push(id);
    btn.textContent = '⭐';
    btn.closest('.ex-card').classList.add('favourite');
  }
  localStorage.setItem('ironforge_favs', JSON.stringify(favourites));
}

// ===== MODAL =====
function openModal(id) {
  const ex = exercises.find(e => e.id === id);
  selectedExercise = ex;
  const isFav = favourites.includes(id);
  const levelColors = { beginner:'rgba(0,200,81,0.15)', intermediate:'rgba(255,215,0,0.15)', advanced:'rgba(255,69,0,0.15)' };
  const levelTextColors = { beginner:'#00c851', intermediate:'var(--accent)', advanced:'var(--primary)' };

  document.getElementById('modalIcon').textContent = ex.icon;
  document.getElementById('modalName').textContent = ex.name;
  document.getElementById('modalMuscle').textContent = (ex.muscle === 'full' ? 'Full Body' : ex.muscle) + ' · ' + ex.type;
  document.getElementById('modalBadges').innerHTML = `
    <span class="modal-badge" style="background:${levelColors[ex.level]};color:${levelTextColors[ex.level]}">${ex.level}</span>
    <span class="modal-badge" style="background:rgba(59,130,246,0.15);color:#60a5fa">${ex.equip}</span>
  `;
  document.getElementById('modalStats').innerHTML = `
    <div class="modal-stat"><strong>${ex.sets}</strong><span>Sets</span></div>
    <div class="modal-stat"><strong>${ex.reps}</strong><span>${ex.muscle==='cardio'&&parseInt(ex.reps)>15?'Seconds':'Reps'}</span></div>
    <div class="modal-stat"><strong>${ex.rest}s</strong><span>Rest</span></div>
    <div class="modal-stat"><strong>~${ex.calories}</strong><span>Kcal/set</span></div>
  `;
  document.getElementById('modalTargets').textContent = ex.targets;
  document.getElementById('modalSteps').innerHTML = ex.steps.map((s,i) => `<li data-n="${i+1}">${s}</li>`).join('');
  document.getElementById('modalTips').innerHTML = ex.tips.map(t => `<li>${t}</li>`).join('');
  document.getElementById('modalMistakes').innerHTML = ex.mistakes.map(m => `<li>${m}</li>`).join('');

  const favBtn = document.getElementById('favBtn');
  favBtn.textContent = isFav ? '⭐ Saved' : '🤍 Save';
  favBtn.className = 'btn-favourite' + (isFav ? ' saved' : '');

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function toggleFavourite() {
  if (!selectedExercise) return;
  const id = selectedExercise.id;
  const btn = document.getElementById('favBtn');
  if (favourites.includes(id)) {
    favourites = favourites.filter(f => f !== id);
    btn.textContent = '🤍 Save';
    btn.classList.remove('saved');
    showToast('Removed from favourites');
  } else {
    favourites.push(id);
    btn.textContent = '⭐ Saved';
    btn.classList.add('saved');
    showToast('⭐ Saved to favourites!');
  }
  localStorage.setItem('ironforge_favs', JSON.stringify(favourites));
  applyFilters();
}

function addToWorkoutFromLib() {
  if (!selectedExercise) return;
  closeModal();
  showToast(`✅ Opening Workout Builder...`);
  setTimeout(() => { window.location.href = 'workout-builder.html'; }, 1200);
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = type === 'warn' ? '#ff9800' : '#00c851';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== INIT =====
renderGrid(exercises);