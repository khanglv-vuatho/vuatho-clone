import React, { useEffect, useRef } from 'react'
import Globe from 'globe.gl'
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

import country from '@/constants/countries.json'

const GlobeComponent = React.memo((props: any) => {
  const globeEl = useRef<any>()
  useEffect(() => {
    // Initialize the globe

    Object.assign(THREE, { TrackballControls })

    const colors = [
      'red',
      'white',
      'blue',
      'green',
      'yellow',
      'purple',
      'orange',
      'pink',
      'brown',
      'gray',
      'black',
      'cyan',
      'gold',
      'silver',
      'violet',
      'indigo',
      'teal',
      'magenta',
      'lime',
      'olive',
      'maroon',
      'navy',
      'salmon',
      'tan',
      'turquoise',
      'plum',
      'lavender',
      'peru',
      'sienna',
    ]
    const arcsData: any = Array.from(Array(15).keys()).map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: [
        colors[Math.floor(Math.random() * colors.length)],
        colors[Math.floor(Math.random() * colors.length)],
      ],
    }))

    const globe = Globe()(globeEl.current)
    const pointsData = arcsData.flatMap((arc: any) => [
      { lat: arc.startLat, lng: arc.startLng },
      { lat: arc.endLat, lng: arc.endLng },
    ])

    globe
      .width(960)
      .height(960)
      .backgroundColor('#FFFFFF00')
      .globeImageUrl('//unpkg.com/three-globe@2.30.0/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .arcsData(arcsData)
      .arcColor('color')
      .arcsTransitionDuration(500)
      .arcStroke(1)
      .arcDashLength(() => Math.random())
      .arcDashGap(() => Math.random())
      .arcDashAnimateTime(() => Math.random() * 4000 + 500)
      .pointsData(pointsData)
      .pointLat('lat')
      .pointLng('lng')
      .pointColor(() => '#FDFDFDDE') // Set the color of the points
      .pointAltitude(0) // Points should be at the surface
      .pointRadius(0.5) // Set the radius for the points, adjust as needed
      .showAtmosphere(false)
    //   .hexPolygonsData(country.features)
    //   .hexPolygonResolution(3)
    //   .hexPolygonMargin(0.3)
    //   .hexPolygonUseDots(true)
    //   .hexPolygonColor(
    //     () =>
    //       `#${Math.round(Math.random() * Math.pow(2, 24))
    //         .toString(16)
    //         .padStart(6, '0')}`,
    //   )
    //   .hexPolygonLabel(
    //     ({ properties: d }: any) => `
    //       <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
    //       Population: <i>${d.POP_EST}</i>
    //     `,
    //   )

    const CLOUDS_IMG_URL =
      'https://vasturiano.github.io/three-globe/example/clouds/clouds.png' // Path to your clouds image
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(globe.getGlobeRadius() * 1.01, 75, 75),
      new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(CLOUDS_IMG_URL),
        transparent: true,
      }),
    )
    globe.scene().add(clouds)

    globe.controls().autoRotate = true
    globe.controls().autoRotateSpeed = 0.3
    globe.controls().enableZoom = false

    function animate() {
      globe.controls().update()
      clouds.rotation.y -= 0.001
      requestAnimationFrame(animate)
      globe.renderer().render(globe.scene(), globe.camera())
    }
    animate()

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
      //   globe.camera().aspect = window.innerWidth / window.innerHeight
      //   globe.camera().updateProjectionMatrix()
      //   globe.renderer().setSize(window.innerWidth, window.innerHeight)
    }
    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, [])
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <div ref={globeEl} style={{ width: '100%', height: '100%' }} />
    </div>
  )
})

export default GlobeComponent
